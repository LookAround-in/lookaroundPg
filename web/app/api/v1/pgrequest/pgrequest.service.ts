
import { PgRequestData } from "@/interfaces/pg";
import prisma from "@/lib/Prisma";
import { resend } from "@/lib/resend";
import { NextResponse } from "next/server";

export class PgRequestServices {
    private prismaClient;

    constructor() {
        this.prismaClient = prisma;
    }

    async createPgRequest(requestData: PgRequestData) {
        try {
            if (!requestData) {
                return NextResponse.json({
                    success: false,
                    message: "Request data is required",
                }, { status: 400 });
            }

            const newPgRequest = await this.prismaClient.pgRequest.create({
                data: requestData,
            });

            // From requestData, get the userId, hostId and pgDataId
            const { userId, hostId, pgId: pgDataId } = requestData;

            // Using those ids, fetch the user, host and pgData details
            const [user, host, pgData] = await Promise.all([
                // Fetch user details
                this.prismaClient.user.findUnique({
                    where: { id: userId },
                    select: {
                        name: true,
                        email: true,
                        phone: true
                    }
                }),
                // Fetch host details (host profile with user info)
                this.prismaClient.hostProfile.findUnique({
                    where: { id: hostId },
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true,
                                phone: true
                            }
                        }
                    }
                }),
                // Fetch PG details
                this.prismaClient.pgData.findUnique({
                    where: { id: pgDataId },
                    select: {
                        title: true,
                        address: true,
                        propertyType: true
                    }
                })
            ]);

            // Send email to super admin with all details
            await resend.emails.send({
                from: process.env.FROM_EMAIL || "LookaroundPG <onboarding@resend.dev>",
                to: ["try.bivek@gmail.com"],   // TODO: This should be the super admin email
                subject: "New PG Request Created",
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
                            🏠 New PG Request Created
                        </h2>
                        
                        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #007bff; margin-top: 0;">Request Information</h3>
                            <p><strong>Request ID:</strong> ${newPgRequest.id}</p>
                            <p><strong>Status:</strong> ${newPgRequest.status}</p>
                            <p><strong>Created:</strong> ${new Date().toLocaleString()}</p>
                        </div>

                        <div style="background-color: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #0056b3; margin-top: 0;">👤 User Details</h3>
                            <p><strong>Name:</strong> ${user?.name || 'N/A'}</p>
                            <p><strong>Email:</strong> ${user?.email || 'N/A'}</p>
                            <p><strong>Phone:</strong> ${user?.phone || 'N/A'}</p>
                        </div>

                        <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #856404; margin-top: 0;">🏠 PG Details</h3>
                            <p><strong>PG Name:</strong> ${pgData?.title || 'N/A'}</p>
                            <p><strong>Address:</strong> ${pgData?.address || 'N/A'}</p>
                            <p><strong>Property Type:</strong> ${pgData?.propertyType || 'N/A'}</p>
                        </div>

                        <div style="background-color: #d4edda; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #155724; margin-top: 0;">👨‍💼 Host Details</h3>
                            <p><strong>Host Name:</strong> ${host?.user?.name || 'N/A'}</p>
                            <p><strong>Host Email:</strong> ${host?.user?.email || 'N/A'}</p>
                            <p><strong>Host Phone:</strong> ${host?.user?.phone || 'N/A'}</p>
                        </div>

                        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
                            <p style="color: #666; margin: 0;">
                                Please review this request in the admin dashboard and take appropriate action.
                            </p>
                        </div>
                    </div>
                `,
                text: `
New PG Request Created

Request ID: ${newPgRequest.id}
Status: ${newPgRequest.status}
Created: ${new Date().toLocaleString()}

USER DETAILS:
Name: ${user?.name || 'N/A'}
Email: ${user?.email || 'N/A'}
Phone: ${user?.phone || 'N/A'}

PG DETAILS:
PG Name: ${pgData?.title || 'N/A'}
Address: ${pgData?.address || 'N/A'}
Property Type: ${pgData?.propertyType || 'N/A'}

HOST DETAILS:
Host Name: ${host?.user?.name || 'N/A'}
Host Email: ${host?.user?.email || 'N/A'}
Host Phone: ${host?.user?.phone || 'N/A'}

Please review this request in the admin dashboard and take appropriate action.
                `
            });

            return newPgRequest;
        } catch (error) {
            console.error("Error creating PG request:", error);
            return NextResponse.json({
                success: false,
                message: "Error creating PG request",
                error: error instanceof Error ? error.message : "Unknown error"
            }, { status: 500 });
        }
    }

    async updatePgRequest() { }  // Not required according to our current frontend design

    async deletePgRequest() { }  // Not required according to our current frontend design

    async getPgRequestByHostId(hostId: string) {
        try {
            const pgRequests = await this.prismaClient.pgRequest.findMany({
                where: {
                    hostId: hostId,
                },
                include: {
                    pgData: {
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            address: true,
                            images: true,
                            propertyType: true
                        }
                    },
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    }
                }
            });

            return pgRequests;

        } catch (error) {
            console.error("Error fetching PG requests by host ID:", error);
            return NextResponse.json({
                success: false,
                message: "Error fetching PG requests",
                error: error instanceof Error ? error.message : "Unknown error"
            }, { status: 500 });
        }
    }

    async acceptPgRequest(pgrequestId: string) {
        try {
            const updatedPgRequest = await this.prismaClient.pgRequest.update({
                where: { id: pgrequestId },
                data: { status: "ACCEPTED" },
            });
            console.log(updatedPgRequest);

            return updatedPgRequest;
        } catch (error) {
            console.error("Error accepting PG request:", error);
            return NextResponse.json({
                success: false,
                message: "Error accepting PG request",
                error: error instanceof Error ? error.message : "Unknown error"
            }, { status: 500 });
        }
    }

    async rejectPgRequest(pgrequestId: string) {
        try {
            console.log(pgrequestId + " is the id of the pg request to be rejected");

            const updatedPgRequest = await this.prismaClient.pgRequest.update({
                where: { id: pgrequestId },
                data: { status: "REJECTED" },
            });

            console.log("Updated PG Request:", updatedPgRequest);

            return updatedPgRequest;
        } catch (error) {
            console.error("Error rejecting PG request:", error);
            return NextResponse.json({
                success: false,
                message: "Error rejecting PG request",
                error: error instanceof Error ? error.message : "Unknown error"
            }, { status: 500 });
        }
    }
}
