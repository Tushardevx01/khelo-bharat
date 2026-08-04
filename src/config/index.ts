export * from "./roles";
export * from "./status";
export * from "./routes";

export const APP_NAME = "Khelo Bharat";
export const APP_DESCRIPTION = "India's Premier Sports Ecosystem Platform";
export const APP_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 100,
} as const;

export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  ALLOWED_DOCUMENT_TYPES: ["application/pdf"],
} as const;

export const RATE_LIMIT = {
  WINDOW_MS: 60 * 1000, // 1 minute
  MAX_REQUESTS: 10,
} as const;

export const CACHE_KEYS = {
  USER: "user",
  TOURNAMENT: "tournament",
  ATHLETE: "athlete",
  CERTIFICATE: "certificate",
  NOTIFICATION: "notification",
} as const;

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Chandigarh", "Puducherry",
] as const;
