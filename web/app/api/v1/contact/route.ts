import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { requireUser } from "@/lib/auth-middleware";

export async function POST(request: NextRequest) {
    try {

        // checking if the user is Logged in or not
        const authResult = await requireUser(request);
        if (authResult.error) {
            return authResult.error;
        }
        // const user = authResult.user;

        // Get the form data from the request body
        const body = await request.json();
        const { name, email, phone, category, subject, message } = body;

        // Validate required fields
        if (!name || !email || !phone || !category || !subject || !message) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are required (name, email, phone, category, subject, message)"
                },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please provide a valid email address"
                },
                { status: 400 }
            );
        }

        // Validate phone number (10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Phone number must be exactly 10 digits"
                },
                { status: 400 }
            );
        }

        // Use resend to send an email to the super admin with the form data
        const emailResult = await resend.emails.send({
            from: process.env.FROM_EMAIL || "LookaroundPG <onboarding@resend.dev>",
            to: ["info.lookaroundpg@gmail.com"],
            subject: `Contact Form: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
                        📧 New Contact Form Submission
                    </h2>
                    
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #007bff; margin-top: 0;">Contact Information</h3>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <p><strong>Category:</strong> ${category}</p>
                    </div>

                    <div style="background-color: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #0056b3; margin-top: 0;">Subject</h3>
                        <p style="font-weight: bold; color: #333;">${subject}</p>
                    </div>

                    <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #856404; margin-top: 0;">Message</h3>
                        <p style="white-space: pre-wrap; color: #333;">${message}</p>
                    </div>

                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
                        <p style="color: #666; margin: 0;">
                            Submitted on: ${new Date().toLocaleString()}
                        </p>
                    </div>
                </div>
            `,
            text: `
New Contact Form Submission

Contact Information:
Name: ${name}
Email: ${email}
Phone: ${phone}
Category: ${category}

Subject: ${subject}

Message:
${message}

Submitted on: ${new Date().toLocaleString()}
            `
        });

        // Check if email was sent successfully
        if (emailResult.error) {
            console.error('Email sending failed:', emailResult.error);
            return NextResponse.json(
                {
                    success: false,
                    message: "Failed to send message. Please try again later."
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Your message has been sent successfully. We'll get back to you soon!"
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Contact form error:', error);

        return NextResponse.json(
            {
                success: false,
                message: "An unexpected error occurred. Please try again later."
            },
            { status: 500 }
        );
    }
}