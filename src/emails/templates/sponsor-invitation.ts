export function getSponsorInvitationEmail(
  sponsorName: string,
  platformName: string
): string {
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
        .content { padding: 32px; }
        .content h2 { color: #18181b; margin: 0 0 16px; font-size: 20px; }
        .content p { color: #52525b; line-height: 1.6; margin: 0 0 16px; }
        .btn { display: inline-block; background: #18181b; color: white !important; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 16px 0; }
        .benefits { background: #f4f4f5; padding: 24px; border-radius: 8px; margin: 16px 0; }
        .benefits ul { margin: 0; padding-left: 20px; }
        .benefits li { color: #52525b; margin: 8px 0; }
        .footer { padding: 24px 32px; background: #fafafa; border-top: 1px solid #e4e4e7; text-align: center; }
        .footer p { color: #71717a; font-size: 12px; margin: 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Partner With Khelo Bharat</h1>
        </div>
        <div class="content">
          <h2>Dear ${sponsorName},</h2>
          <p>We invite you to partner with ${platformName} on India's fastest-growing sports ecosystem platform.</p>

          <div class="benefits">
            <p><strong>Why Partner With Us:</strong></p>
            <ul>
              <li>Access to 50,000+ verified athletes</li>
              <li>Connect with 1,200+ schools across India</li>
              <li>Sponsor tournaments in 28+ states</li>
              <li>Build brand visibility in the sports sector</li>
              <li>Support India's sporting future</li>
            </ul>
          </div>

          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://khelobharat.com'}/sponsors" class="btn">Learn More</a>

          <p>We look forward to hearing from you.</p>
          <p>Best regards,<br>The Khelo Bharat Team</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Khelo Bharat. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
