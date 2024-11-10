import { NextRequest, NextResponse } from 'next/server';
import { EmailTemplate } from "@/components/ui/email-template";
import { Resend } from "resend";
import { z } from "zod";
import { formSchema } from "@/lib/shemas"; // Correcting the path if necessary

const resend = new Resend(process.env.RESEND_API_KEY);

// Your existing function
export const send = async (emailFormData: z.infer<typeof formSchema>) => {
    try {
        // TODO: Add this emailFormData to some database

        const { error } = await resend.emails.send({
            from: `Griffin <${process.env.RESEND_FROM_EMAIL}>`,
            to: [emailFormData.email],
            subject: "Customized Subject - Griffin Fraud Alert", // Updated subject line
            react: EmailTemplate({
                firstName: emailFormData.firstName,
                message: emailFormData.message, // Passing the message to the template
            }),
        });

        if (error) {
            throw error;
        }
    } catch (e) {
        throw e;
    }
};

// New function to handle API POST requests
export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        // Validate incoming data using Zod
        const parsedData = formSchema.parse(data);

        // Call your existing send function
        await send(parsedData);

        // Return a success response
        return NextResponse.json({ message: 'Email sent successfully' });
    } catch (error) {
        // Type narrowing for 'error'
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }

        // Handle other error types
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}

