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

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: "Failed to send email" };
  }
}

export function welcomeEmailTemplate(name: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; background: #f4f4f7; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #FF6B35 0%, #D72638 100%); padding: 40px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; }
        .content { padding: 40px; }
        .btn { display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #FF6B35 0%, #D72638 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; }
        .footer { padding: 20px 40px; text-align: center; color: #999; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏋️ Welcome to Khelo Bharat!</h1>
        </div>
        <div class="content">
          <h2>Hello ${name},</h2>
          <p>Welcome to India's premier sports ecosystem platform! You're now part of a community that connects athletes, schools, coaches, and sponsors.</p>
          <p>Get started by completing your profile and exploring upcoming tournaments.</p>
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard" class="btn">Go to Dashboard</a>
        </div>
        <div class="footer">
          <p>© 2024 Khelo Bharat. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function passwordResetEmailTemplate(name: string, resetUrl: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; background: #f4f4f7; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #FF6B35 0%, #D72638 100%); padding: 40px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; }
        .content { padding: 40px; }
        .btn { display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #FF6B35 0%, #D72638 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header"><h1>Password Reset</h1></div>
        <div class="content">
          <h2>Hello ${name},</h2>
          <p>We received a request to reset your password. Click the button below to proceed:</p>
          <a href="${resetUrl}" class="btn">Reset Password</a>
          <p style="margin-top: 20px; color: #666; font-size: 14px;">This link expires in 1 hour. If you didn't request this, please ignore this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function tournamentRegistrationEmailTemplate(
  name: string,
  tournamentName: string
) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; background: #f4f4f7; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #FF6B35 0%, #D72638 100%); padding: 40px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; }
        .content { padding: 40px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header"><h1>🏆 Tournament Registration</h1></div>
        <div class="content">
          <h2>Hello ${name},</h2>
          <p>You have been successfully registered for <strong>${tournamentName}</strong>.</p>
          <p>Good luck and give your best!</p>
          <p>— The Khelo Bharat Team</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function sponsorshipRequestEmailTemplate(
  sponsorName: string,
  amount: number
) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; background: #f4f4f7; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #FF6B35 0%, #D72638 100%); padding: 40px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; }
        .content { padding: 40px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header"><h1>🤝 New Sponsorship Request</h1></div>
        <div class="content">
          <h2>New Sponsorship Request</h2>
          <p><strong>${sponsorName}</strong> has submitted a sponsorship request of <strong>₹${amount.toLocaleString("en-IN")}</strong>.</p>
          <p>Log in to your dashboard to review and respond.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function contactFormEmailTemplate(
  name: string,
  email: string,
  subject: string,
  message: string
) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; background: #f4f4f7; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #FF6B35 0%, #D72638 100%); padding: 40px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; }
        .content { padding: 40px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header"><h1>📬 New Contact Message</h1></div>
        <div class="content">
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function certificateEmailTemplate(
  name: string,
  certificateTitle: string
) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; background: #f4f4f7; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #FF6B35 0%, #D72638 100%); padding: 40px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; }
        .content { padding: 40px; }
        .btn { display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #FF6B35 0%, #D72638 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header"><h1>🏅 Certificate Ready!</h1></div>
        <div class="content">
          <h2>Congratulations ${name}!</h2>
          <p>Your certificate <strong>"${certificateTitle}"</strong> is now available for download.</p>
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/certificates" class="btn">Download Certificate</a>
        </div>
      </div>
    </body>
    </html>
  `;
}
