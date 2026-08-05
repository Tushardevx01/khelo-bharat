export function getWelcomeEmail(name: string): string {
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
        .features { background: #f4f4f5; padding: 24px; border-radius: 8px; margin: 16px 0; }
        .features ul { margin: 0; padding-left: 20px; }
        .features li { color: #52525b; margin: 8px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Khelo Bharat</h1>
          <p>One Platform. Every Athlete. Every Opportunity.</p>
        </div>
        <div class="content">
          <h2>Welcome, ${name}!</h2>
          <p>We're thrilled to have you join India's premier sports ecosystem platform. You're now part of a community that connects athletes, coaches, schools, and sponsors across the nation.</p>

          <div class="features">
            <p><strong>Here's what you can do:</strong></p>
            <ul>
              <li>Create your athlete profile</li>
              <li>Discover and register for tournaments</li>
              <li>Connect with coaches and sponsors</li>
              <li>Track your performance and achievements</li>
              <li>Earn digital certificates</li>
            </ul>
          </div>

          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://khelobharat.com'}/dashboard" class="btn">Go to Dashboard</a>

          <p>Need help? Reply to this email and we'll get back to you.</p>
          <p>Cheers,<br>The Khelo Bharat Team</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Khelo Bharat. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
