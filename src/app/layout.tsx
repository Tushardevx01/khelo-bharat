import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Khelo Bharat - India's Premier Sports Ecosystem",
  description: "Connecting Athletes, Schools, Coaches, Tournament Organizers, and Sponsors on one platform.",
  keywords: "sports, athletes, tournaments, schools, coaches, sponsors, India, khelo bharat",
  openGraph: {
    title: "Khelo Bharat",
    description: "India's Premier Sports Ecosystem Platform",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <TooltipProvider>
          {children}
        </TooltipProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
