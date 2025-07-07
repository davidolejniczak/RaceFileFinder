"use client";

import React, { use } from "react";
import Search from "@/app/search";

type SearchType = "rider" | "team" | "race";

interface PageProps {
  params: Promise<{
    searchType: string;
  }>;
}

export default function SearchTypePage({ params }: PageProps) {
  const { searchType } = use(params);
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md">
        <Search searchType={searchType as SearchType} />
      </div>
    </div>
  );
}