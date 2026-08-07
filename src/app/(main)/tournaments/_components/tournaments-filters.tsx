"use client";

import { SearchInput } from "@/components/shared/search-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SPORT_CATEGORIES, TOURNAMENT_STATUSES } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, useEffect, useState, useCallback } from "react";

export function TournamentsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSearch = searchParams.get("search") || "";
  const currentSport = searchParams.get("sport") || "all";
  const currentStatus = searchParams.get("status") || "all";

  const [searchValue, setSearchValue] = useState(currentSearch);

  // Simple debounce for search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== currentSearch) {
        updateFilters({ search: searchValue });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchValue, currentSearch, updateFilters]);

  const updateFilters = useCallback((updates: Record<string, string>) => {
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
      router.push(`/tournaments?${params.toString()}`);
    });
  }, [searchParams, router]);

  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex-1">
        <SearchInput 
          placeholder="Search tournaments..." 
          defaultValue={searchValue}
          onSearch={(v) => setSearchValue(v)} 
        />
      </div>
      <Select 
        value={currentSport} 
        onValueChange={(v) => updateFilters({ sport: v })}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="All Sports" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sports</SelectItem>
          {SPORT_CATEGORIES.map((sport) => (
            <SelectItem key={sport.value} value={sport.value}>
              <span className="flex items-center gap-2">
                {sport.icon} {sport.label}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select 
        value={currentStatus} 
        onValueChange={(v) => updateFilters({ status: v })}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          {TOURNAMENT_STATUSES.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
