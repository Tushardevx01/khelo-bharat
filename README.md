

# Khelo Bharat

**One Platform. Every Athlete. Every Opportunity.**

India's complete Sports Ecosystem Platform connecting athletes, schools, coaches, sponsors, and tournament organizers.

## Features

- 🏆 Tournament Management
- 👥 Multi-role Dashboard (Admin, School, Athlete, Coach, Sponsor)
- 📊 Performance Analytics
- 🎓 Digital Certificates
- 💬 Messaging System
- 🔔 Notifications
- 📸 Gallery
- 🏅 Achievements
- 🤝 Sponsor Marketplace
- 🗺️ Interactive Maps
- 📧 Email Notifications
- 🔒 Secure Authentication (Clerk)

## Tech Stack

- **Framework:** Next.js 16 App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI:** shadcn/ui + Radix UI
- **Animations:** Framer Motion
- **Database:** Neon PostgreSQL
- **ORM:** Prisma
- **Auth:** Clerk
- **Storage:** Cloudinary
- **Email:** Nodemailer
- **Validation:** Zod

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (Neon recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/khelo-bharat.git
cd khelo-bharat
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your values
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable UI components
├── features/         # Feature-specific components
├── actions/          # Server actions
├── repositories/     # Data access layer
├── services/         # Business logic layer
├── hooks/            # Custom React hooks
├── providers/        # Context providers
├── lib/              # Utility functions
├── config/           # Configuration
├── constants/        # Application constants
├── types/            # TypeScript types
├── validators/       # Zod validators
├── schemas/          # Form schemas
├── emails/           # Email templates
├── store/            # State management
├── styles/           # Global styles
└── middleware.ts     # Auth middleware
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License © 2026 Khelo Bharat
