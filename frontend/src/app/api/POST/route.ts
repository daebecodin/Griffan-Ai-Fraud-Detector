import { NextRequest, NextResponse } from 'next/server';
import { EmailTemplate } from "@/components/ui/email-template";
import { Resend } from "resend";
import { z } from "zod";
import { formSchema } from "@/lib/shemas"; // Correcting the path if necessary

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (req: NextRequest) => {
    try {
        // Parse the request body as JSON
        const data = await req.json();

        // Validate incoming data using Zod
        const emailFormData = formSchema.parse(data);

        // Send the email
        const { error } = await resend.emails.send({
            from: `Griffin <${process.env.RESEND_FROM_EMAIL}>`,
            to: [emailFormData.email],
            subject: "Customized Subject - Griffin Fraud Alert",
            react: EmailTemplate({
                firstName: emailFormData.firstName,
                message: emailFormData.message,
            }),
        });

        if (error) {
            throw error;
        }

        // Return a success response
        return NextResponse.json({ message: 'Email sent successfully' });
    } catch (error) {
        // Handle Zod validation errors
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }

        // Handle other types of errors
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
};
