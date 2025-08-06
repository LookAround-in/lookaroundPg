import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(request: NextRequest) { 
    try {
        // Get the form data from the request body
        const body = await request.json();
        const { name, email, phone, propertyType, location, message } = body;

        // Validate required fields
        if (!name || !email || !phone || !location) {
            return NextResponse.json(
                { 
                    success: false, 
                    message: "Required fields are missing (name, email, phone, location)" 
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

        console.log('Processing partner application');
        
        // Use resend to send an email to the super admin with the partner application data
        const emailResult = await resend.emails.send({
            from: process.env.FROM_EMAIL || "LookaroundPG <onboarding@resend.dev>",
            to: ["try.bivek@gmail.com"], // Super admin email
            subject: `Partnership Application: ${name} - ${location}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
                        🤝 New Partnership Application
                    </h2>
                    
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #007bff; margin-top: 0;">Applicant Information</h3>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                    </div>

                    <div style="background-color: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #0056b3; margin-top: 0;">Property Details</h3>
                        <p><strong>Property Type:</strong> ${propertyType || 'Not specified'}</p>
                        <p><strong>Location:</strong> ${location}</p>
                    </div>

                    ${message ? `
                    <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #856404; margin-top: 0;">Additional Information</h3>
                        <p style="white-space: pre-wrap; color: #333;">${message}</p>
                    </div>
                    ` : ''}

                    <div style="background-color: #d4edda; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #155724; margin-top: 0;">Next Steps</h3>
                        <ul style="color: #333; margin: 0; padding-left: 20px;">
                            <li>Contact the applicant within 24 hours</li>
                            <li>Schedule a property visit</li>
                            <li>Discuss partnership terms and conditions</li>
                            <li>Review property documentation</li>
                        </ul>
                    </div>

                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
                        <p style="color: #666; margin: 0;">
                            Application submitted on: ${new Date().toLocaleString()}
                        </p>
                    </div>
                </div>
            `,
            text: `
New Partnership Application

Applicant Information:
Name: ${name}
Email: ${email}
Phone: ${phone}

Property Details:
Property Type: ${propertyType || 'Not specified'}
Location: ${location}

${message ? `Additional Information:\n${message}\n` : ''}

Next Steps:
- Contact the applicant within 24 hours
- Schedule a property visit
- Discuss partnership terms and conditions
- Review property documentation

Application submitted on: ${new Date().toLocaleString()}
            `
        });

        // Check if email was sent successfully
        if (emailResult.error) {
            console.error('Partnership email sending failed:', emailResult.error);
            return NextResponse.json(
                { 
                    success: false, 
                    message: "Failed to submit partnership application. Please try again later." 
                },
                { status: 500 }
            );
        }

        console.log('Partnership application email sent successfully:', emailResult.data?.id);

        return NextResponse.json(
            { 
                success: true, 
                message: "Your partnership application has been submitted successfully. We'll get back to you within 24 hours!" 
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Partnership application error:', error);
        
        return NextResponse.json(
            { 
                success: false, 
                message: "An unexpected error occurred. Please try again later." 
            },
            { status: 500 }
        );
    }
}