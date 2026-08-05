# Deployment

## Vercel Deployment

### Prerequisites
- Vercel account
- GitHub repository connected

### Steps

1. Import project on Vercel
2. Configure environment variables
3. Deploy

### Environment Variables

| Variable | Description |
|----------|-------------|
| DATABASE_URL | PostgreSQL connection string |
| NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY | Clerk publishable key |
| CLERK_SECRET_KEY | Clerk secret key |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name |
| CLOUDINARY_API_KEY | Cloudinary API key |
| CLOUDINARY_API_SECRET | Cloudinary API secret |
| EMAIL_HOST | SMTP host |
| EMAIL_PORT | SMTP port |
| EMAIL_USER | SMTP username |
| EMAIL_PASS | SMTP password |
| EMAIL_FROM | Sender email |

### Post-Deployment

1. Run Prisma migrations
2. Set up Clerk webhooks
3. Configure Cloudinary
4. Test all features
