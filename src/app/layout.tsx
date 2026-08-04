import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Khelo Bharat - India's Premier Sports Ecosystem",
  description: "Connecting Athletes, Schools, Coaches, Tournament Organizers, and Sponsors on one platform.",
  keywords: "sports, athletes, tournaments, schools, coaches, sponsors, India, khelo bharat",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
