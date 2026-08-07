"use client";

import { SearchInput } from "@/components/shared/search-input";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, useEffect, useState } from "react";

export function SchoolsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSearch = searchParams.get("search") || "";

  const [searchValue, setSearchValue] = useState(currentSearch);

  // Simple debounce for search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== currentSearch) {
        updateFilters({ search: searchValue });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchValue, currentSearch]);

  const updateFilters = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // Reset to page 1 on filter change
    params.delete("page");

    startTransition(() => {
      router.push(`/schools?${params.toString()}`);
    });
  };

  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex-1">
        <SearchInput 
          placeholder="Search schools..." 
          defaultValue={searchValue}
          onSearch={(v) => setSearchValue(v)} 
        />
      </div>
    </div>
  );
}
