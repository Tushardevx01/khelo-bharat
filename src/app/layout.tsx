import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Oswald, Roboto_Mono } from "next/font/google";
import { Providers } from "@/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto-mono" });

export const metadata: Metadata = {
  title: "Khelo Bharat | One Platform. Every Athlete. Every Opportunity.",
  description: "India's complete Sports Ecosystem Platform connecting athletes, schools, coaches, sponsors, and tournament organizers.",
  keywords: ["sports", "india", "athletes", "tournaments", "coaches", "sponsors", "khelo bharat"],
  openGraph: {
    title: "Khelo Bharat",
    description: "One Platform. Every Athlete. Every Opportunity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${oswald.variable} ${robotoMono.variable} font-sans antialiased`} style={{ backgroundColor: "var(--color-background)" }}>
        <ClerkProvider>
          <Providers>
            {children}
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
