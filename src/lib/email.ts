import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
    return true;
  } catch (error) {
    console.error("Email send error:", error);
    return false;
  }
}

export function emailWrapper(content: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f4f4f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #18181b 0%, #27272a 100%); padding: 32px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 24px; font-weight: 700; }
        .header p { color: #a1a1aa; margin: 8px 0 0; font-size: 14px; }
        .content { padding: 32px; }
        .content h2 { color: #18181b; margin: 0 0 16px; font-size: 20px; }
        .content p { color: #52525b; line-height: 1.6; margin: 0 0 16px; }
        .btn { display: inline-block; background: #18181b; color: white !important; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 16px 0; }
        .btn:hover { background: #27272a; }
        .footer { padding: 24px 32px; background: #fafafa; border-top: 1px solid #e4e4e7; text-align: center; }
        .footer p { color: #71717a; font-size: 12px; margin: 0; }
        .code { background: #f4f4f5; padding: 16px; border-radius: 8px; font-size: 24px; font-weight: bold; text-align: center; letter-spacing: 4px; color: #18181b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Khelo Bharat</h1>
          <p>One Platform. Every Athlete. Every Opportunity.</p>
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Khelo Bharat. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function welcomeEmail(name: string): string {
  return emailWrapper(`
    <h2>Welcome to Khelo Bharat! 🏆</h2>
    <p>Hi ${name},</p>
    <p>We're thrilled to have you join India's premier sports ecosystem platform. You're now part of a community that connects athletes, coaches, schools, and sponsors across the nation.</p>
    <p>Here's what you can do:</p>
    <ul>
      <li>Create your athlete profile</li>
      <li>Discover and register for tournaments</li>
      <li>Connect with coaches and sponsors</li>
      <li>Track your performance and achievements</li>
    </ul>
    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://khelobharat.com'}/dashboard" class="btn">Go to Dashboard</a>
    <p>Need help? Reply to this email and we'll get back to you.</p>
  `);
}

export function verificationEmail(name: string, code: string): string {
  return emailWrapper(`
    <h2>Verify Your Email</h2>
    <p>Hi ${name},</p>
    <p>Please use the following verification code to verify your email address:</p>
    <div class="code">${code}</div>
    <p>This code will expire in 10 minutes.</p>
    <p>If you didn't request this, please ignore this email.</p>
  `);
}

export function passwordResetEmail(name: string, resetUrl: string): string {
  return emailWrapper(`
    <h2>Reset Your Password</h2>
    <p>Hi ${name},</p>
    <p>We received a request to reset your password. Click the button below to create a new password:</p>
    <a href="${resetUrl}" class="btn">Reset Password</a>
    <p>This link will expire in 1 hour.</p>
    <p>If you didn't request this, please ignore this email.</p>
  `);
}

export function tournamentRegistrationEmail(
  athleteName: string,
  tournamentName: string,
  date: string
): string {
  return emailWrapper(`
    <h2>Tournament Registration Confirmed</h2>
    <p>Hi ${athleteName},</p>
    <p>You have successfully registered for <strong>${tournamentName}</strong>.</p>
    <p><strong>Date:</strong> ${date}</p>
    <p>Make sure to arrive 30 minutes before the scheduled time. Good luck!</p>
    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://khelobharat.com'}/tournaments" class="btn">View Tournament</a>
  `);
}

export function certificateGeneratedEmail(
  userName: string,
  certificateTitle: string
): string {
  return emailWrapper(`
    <h2>Your Certificate is Ready!</h2>
    <p>Hi ${userName},</p>
    <p>Your certificate <strong>${certificateTitle}</strong> has been generated and is ready for download.</p>
    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://khelobharat.com'}/certificates" class="btn">Download Certificate</a>
  `);
}

export function sponsorInvitationEmail(
  sponsorName: string,
  platformName: string
): string {
  return emailWrapper(`
    <h2>Partner With Khelo Bharat</h2>
    <p>Dear ${sponsorName},</p>
    <p>We invite you to partner with ${platformName} on India's fastest-growing sports ecosystem platform.</p>
    <p>Connect with talented athletes, schools, and coaches across India.</p>
    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://khelobharat.com'}/sponsors" class="btn">Learn More</a>
  `);
}

export function contactEmail(
  name: string,
  email: string,
  subject: string,
  message: string
): string {
  return emailWrapper(`
    <h2>New Contact Message</h2>
    <p><strong>From:</strong> ${name} (${email})</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `);
}
