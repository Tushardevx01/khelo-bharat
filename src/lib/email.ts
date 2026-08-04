import nodemailer from "nodemailer";
import { config } from "@/config";
import { logger } from "./logger";

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.port === 465,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

export type EmailOptions = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export async function sendEmail(options: EmailOptions): Promise<void> {
  try {
    await transporter.sendMail({
      from: config.email.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
    logger.info("Email sent successfully", { to: options.to, subject: options.subject });
  } catch (error) {
    logger.error("Failed to send email", error as Error, { to: options.to });
    throw error;
  }
}

function baseTemplate(content: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background: #f4f4f7; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: linear-gradient(135deg, #FF6B35 0%, #D72638 100%); padding: 32px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; }
        .content { padding: 32px; color: #333333; line-height: 1.6; }
        .content h2 { color: #1a1a2e; margin-top: 0; }
        .btn { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #FF6B35 0%, #D72638 100%); color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 16px 0; }
        .footer { padding: 24px 32px; text-align: center; color: #999999; font-size: 12px; border-top: 1px solid #eeeeee; }
        .divider { border: none; border-top: 1px solid #eeeeee; margin: 24px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>KHELO BHARAT</h1>
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Khelo Bharat. All rights reserved.</p>
          <p>India's Premier Sports Ecosystem Platform</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export const emailTemplates = {
  welcome: (name: string) =>
    baseTemplate(`
      <h2>Welcome to Khelo Bharat!</h2>
      <p>Hello ${name},</p>
      <p>Welcome to India's premier sports ecosystem platform. You're now part of a community connecting athletes, schools, coaches, and sponsors.</p>
      <p>Get started by completing your profile and exploring upcoming tournaments.</p>
      <a href="${config.app.url}/dashboard" class="btn">Go to Dashboard</a>
    `),

  passwordReset: (name: string, resetUrl: string) =>
    baseTemplate(`
      <h2>Password Reset Request</h2>
      <p>Hello ${name},</p>
      <p>We received a request to reset your password. Click the button below to proceed:</p>
      <a href="${resetUrl}" class="btn">Reset Password</a>
      <p><small>This link expires in 1 hour. If you didn't request this, please ignore this email.</small></p>
    `),

  tournamentRegistration: (name: string, tournamentName: string) =>
    baseTemplate(`
      <h2>Tournament Registration Confirmed</h2>
      <p>Hello ${name},</p>
      <p>You have been successfully registered for <strong>${tournamentName}</strong>.</p>
      <p>Good luck and give your best!</p>
      <a href="${config.app.url}/tournaments" class="btn">View Tournament</a>
    `),

  certificateReady: (name: string, certificateTitle: string) =>
    baseTemplate(`
      <h2>Your Certificate is Ready!</h2>
      <p>Congratulations ${name}!</p>
      <p>Your certificate "<strong>${certificateTitle}</strong>" is now available for download.</p>
      <a href="${config.app.url}/certificates" class="btn">Download Certificate</a>
    `),

  sponsorshipRequest: (sponsorName: string, amount: number) =>
    baseTemplate(`
      <h2>New Sponsorship Request</h2>
      <p><strong>${sponsorName}</strong> has submitted a sponsorship request of <strong>₹${amount.toLocaleString("en-IN")}</strong>.</p>
      <p>Log in to your dashboard to review and respond.</p>
      <a href="${config.app.url}/sponsor" class="btn">View Request</a>
    `),

  contactForm: (name: string, email: string, subject: string, message: string) =>
    baseTemplate(`
      <h2>New Contact Message</h2>
      <p><strong>From:</strong> ${name} (${email})</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr class="divider">
      <p>${message}</p>
    `),
};
