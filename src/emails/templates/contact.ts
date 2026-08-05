export function getContactEmail(
  name: string,
  email: string,
  subject: string,
  message: string
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
        .message-box { background: #f4f4f5; padding: 16px; border-radius: 8px; margin: 16px 0; }
        .footer { padding: 24px 32px; background: #fafafa; border-top: 1px solid #e4e4e7; text-align: center; }
        .footer p { color: #71717a; font-size: 12px; margin: 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Contact Message</h1>
        </div>
        <div class="content">
          <h2>You have a new message</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>

          <div class="message-box">
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Khelo Bharat. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
