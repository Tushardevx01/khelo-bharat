"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { PageHeader } from "@/components/layout/page-header";
import { SearchInput } from "@/components/shared/search-input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Trophy, School, Building2 } from "lucide-react";

export default function SearchPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          title="Search"
          description="Find athletes, tournaments, schools, and sponsors."
        />

        <div className="mt-8">
          <SearchInput
            placeholder="Search across all categories..."
            onSearch={setSearch}
          />
        </div>

        <Tabs defaultValue="athletes" className="mt-8">
          <TabsList>
            <TabsTrigger value="athletes" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Athletes
            </TabsTrigger>
            <TabsTrigger value="tournaments" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Tournaments
            </TabsTrigger>
            <TabsTrigger value="schools" className="flex items-center gap-2">
              <School className="h-4 w-4" />
              Schools
            </TabsTrigger>
            <TabsTrigger value="sponsors" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Sponsors
            </TabsTrigger>
          </TabsList>
          <TabsContent value="athletes" className="mt-4">
            <div className="text-center py-12 text-neutral-500">
              <User className="mx-auto h-12 w-12 mb-4" />
              <p>Search for athletes by name, sport, or location.</p>
            </div>
          </TabsContent>
          <TabsContent value="tournaments" className="mt-4">
            <div className="text-center py-12 text-neutral-500">
              <Trophy className="mx-auto h-12 w-12 mb-4" />
              <p>Search for tournaments by name, sport, or location.</p>
            </div>
          </TabsContent>
          <TabsContent value="schools" className="mt-4">
            <div className="text-center py-12 text-neutral-500">
              <School className="mx-auto h-12 w-12 mb-4" />
              <p>Search for schools by name or location.</p>
            </div>
          </TabsContent>
          <TabsContent value="sponsors" className="mt-4">
            <div className="text-center py-12 text-neutral-500">
              <Building2 className="mx-auto h-12 w-12 mb-4" />
              <p>Search for sponsors by company name or industry.</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
