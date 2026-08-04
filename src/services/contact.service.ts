import { contactRepository } from "@/repositories";
import { sendEmail, emailTemplates } from "@/lib/email";
import { logger } from "@/lib/logger";

export const contactService = {
  async submitContact(data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) {
    await contactRepository.create(data);

    // Send email notification
    sendEmail({
      to: process.env.EMAIL_FROM!,
      subject: `Contact: ${data.subject}`,
      html: emailTemplates.contactForm(data.name, data.email, data.subject, data.message),
    }).catch((error) => logger.error("Failed to send contact email", error));

    return { message: "Message sent successfully" };
  },
};
