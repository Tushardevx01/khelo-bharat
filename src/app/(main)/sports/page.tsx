"use client";

import { Header } from "@/components/layout/header";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { SPORT_CATEGORIES } from "@/constants";
import Link from "next/link";

export default function SportsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          title="Sports"
          description="Explore all sports available on Khelo Bharat."
        />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {SPORT_CATEGORIES.map((sport) => (
            <Link key={sport.value} href={`/sports?category=${sport.value}`}>
              <Card className="transition-all hover:shadow-lg hover:scale-[1.02]">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{sport.icon}</div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    {sport.label}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                    Explore tournaments and athletes
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}