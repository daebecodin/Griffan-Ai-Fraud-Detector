import { EmailTemplate } from "@/components/ui/email-template";
import { Resend } from "resend";
import { z } from "zod";
import { formSchema } from "@//lib/shemas";

const resend = new Resend(process.env.RESEND_API_KEY);

export const send = async (emailFormData: z.infer<typeof formSchema>) => {
    try {
        // TODO: Add this emailFormData to some database

        // Example modifications to the subject and message content:
        const { error } = await resend.emails.send({
            from: `Griffin <${process.env.RESEND_FROM_EMAIL}>`,
            to: [emailFormData.email],
            subject: "Customized Subject - Griffin Fraud Alert", // Updated subject line
            react: EmailTemplate({
                firstName: emailFormData.firstName,
                message: emailFormData.message // Passing the message to the template
            }),
        });

        if (error) {
            throw error;
        }
    } catch (e) {
        throw e;
    }
};
