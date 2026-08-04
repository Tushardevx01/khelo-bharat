import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  NEXT_PUBLIC_BASE_URL: z.string().url(),

  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),

  EMAIL_HOST: z.string().min(1),
  EMAIL_PORT: z.string().regex(/^\d+$/),
  EMAIL_USER: z.string().email(),
  EMAIL_PASS: z.string().min(1),
  EMAIL_FROM: z.string().email(),
});

function validateEnv() {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }
  return parsed.data;
}

export const env = validateEnv();

export const config = {
  app: {
    name: "Khelo Bharat",
    description: "India's Premier Sports Ecosystem Platform",
    url: env.NEXT_PUBLIC_BASE_URL,
  },
  auth: {
    jwtSecret: env.JWT_SECRET,
    tokenExpiry: "7d",
    cookieName: "token",
  },
  database: {
    url: env.DATABASE_URL,
  },
  cloudinary: {
    cloudName: env.CLOUDINARY_CLOUD_NAME,
    apiKey: env.CLOUDINARY_API_KEY,
    apiSecret: env.CLOUDINARY_API_SECRET,
  },
  email: {
    host: env.EMAIL_HOST,
    port: parseInt(env.EMAIL_PORT, 10),
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
    from: env.EMAIL_FROM,
  },
} as const;
