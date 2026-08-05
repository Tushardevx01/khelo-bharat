export const config = {
  app: {
    name: "Khelo Bharat",
    tagline: "One Platform. Every Athlete. Every Opportunity.",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://khelobharat.com",
    description: "India's complete Sports Ecosystem Platform connecting athletes, schools, coaches, sponsors, and tournament organizers.",
  },
  clerk: {
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!,
    signInUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/login",
    signUpUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || "/sign-up",
    afterSignInUrl: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || "/dashboard",
    afterSignUpUrl: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || "/dashboard",
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    uploadFolder: "khelo-bharat",
  },
  email: {
    host: process.env.EMAIL_HOST!,
    port: parseInt(process.env.EMAIL_PORT || "587"),
    user: process.env.EMAIL_USER!,
    from: process.env.EMAIL_FROM!,
  },
  pagination: {
    defaultLimit: 10,
    maxLimit: 100,
  },
} as const;
