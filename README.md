# Khelo Bharat (खेला भारत)

**One Platform. Every Athlete. Every Opportunity.**

India's comprehensive Sports Ecosystem Platform built to bridge the gap between athletes, schools, coaches, sponsors, and tournament organizers. Designed with modern architecture to deliver a seamless, scalable, and secure experience for the sporting community.

---

## 🌟 Key Features

- **🏆 Comprehensive Tournament Management**: Organizers can create, manage, and track tournaments with complete lifecycle support (Draft to Completed).
- **👥 Role-Based Access Control**: Tailored dashboards for 5 distinct roles: `SUPER_ADMIN`, `SCHOOL_ADMIN`, `ATHLETE`, `COACH`, and `SPONSOR`.
- **📊 Performance & Analytics**: Athletes can track their stats, while coaches and scouts analyze performance metrics.
- **🎓 Digital Certificates**: Automated generation and verification of digital certificates with secure unique verification codes.
- **🤝 Sponsor Marketplace**: Connects athletes and tournaments with sponsors based on sports category, budget, and location.
- **🎖️ Achievements Tracking**: A verified digital portfolio of sports achievements for athletes.
- **💬 Real-Time Messaging**: Built-in chat system for communication between athletes, coaches, and sponsors.
- **🗺️ Interactive Maps**: Discover tournaments, schools, and athletes geographically using Leaflet integration.
- **🔔 Notification Engine**: Comprehensive system alerts (Email + In-App) for match updates, registrations, and sponsorships.
- **📸 Media Gallery**: Cloudinary-powered image management for athletes, tournaments, and schools.

---

## 🛠️ Tech Stack & Architecture

Khelo Bharat is built with a state-of-the-art **Next.js 15 App Router** architecture, heavily leveraging React Server Components (RSC) and Next.js Server Actions.

### Frontend
- **Framework:** Next.js 15 (React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui + Radix UI Primitives
- **State Management:** Zustand
- **Forms & Validation:** React Hook Form + Zod
- **Animations:** Framer Motion
- **Maps:** Leaflet & React Leaflet
- **Icons:** Lucide React

### Backend & Data Layer
- **Architecture:** `Server Actions` → `Services` → `Repositories`
- **Database:** Neon Serverless PostgreSQL
- **ORM:** Prisma v6
- **Authentication:** Clerk (Next.js App Router Integration)
- **Media Storage:** Cloudinary
- **Email Service:** Nodemailer

---

## 📂 Project Structure

The codebase is strictly organized using a multi-layer architecture to separate concerns, ensuring scalability and maintainability:

```
src/
├── actions/          # Next.js Server Actions (Frontend API boundary)
├── app/              # Next.js App Router (Pages & Layouts)
│   ├── (auth)/       # Public authentication routes
│   └── (main)/       # Protected application routes (Dashboards, Entities)
├── components/       # Reusable UI elements
│   ├── layout/       # Sidebar, Header, Navigation
│   ├── sections/     # Page-level sections
│   └── ui/           # shadcn/ui base components
├── config/           # Configuration files
├── lib/              # Utility functions, helpers, and Prisma client instantiation
├── repositories/     # Data Access Layer (Prisma Queries)
├── services/         # Business Logic Layer
├── types/            # TypeScript interfaces & types
└── validators/       # Zod schemas for form validation & API boundaries
```

---

## 🗄️ Database Schema Summary

The relational database is powered by PostgreSQL and managed via Prisma. Core entities include:

- **Users & Roles:** `User`, `Athlete`, `School`, `Coach`, `Sponsor`
- **Events:** `Tournament`, `TournamentRegistration`, `Match`
- **Stats & Portfolio:** `Performance`, `Achievement`, `Certificate`, `Gallery`
- **Engagement:** `Sponsorship`, `Message`, `Notification`
- **Security:** `AuditLog`

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (Node.js 20+ recommended)
- npm, yarn, or pnpm
- A PostgreSQL Database URL (Neon DB recommended)
- Clerk API Keys
- Cloudinary API Keys

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/khelo-bharat.git
   cd khelo-bharat
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and configure the following keys:
   ```env
   # Clerk Auth
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   
   # Database (Neon PostgreSQL)
   DATABASE_URL="postgresql://user:password@host/db?sslmode=require"
   
   # Media (Cloudinary)
   CLOUDINARY_CLOUD_NAME="..."
   CLOUDINARY_API_KEY="..."
   CLOUDINARY_API_SECRET="..."
   ```

4. **Initialize the Database:**
   Generate the Prisma Client and push the schema to your database:
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Start the Development Server:**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🤝 Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - © 2026 Khelo Bharat.
