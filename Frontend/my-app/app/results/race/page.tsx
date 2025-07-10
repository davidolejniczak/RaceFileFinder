"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import RaceTable from "@/components/search-tables/race-table";

function RaceResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 p-8 pb-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            Race Results
          </h1>
          {query && (
            <p className="text-muted-foreground">
              Results for: <span className="font-semibold text-black-600">{query}</span>
            </p>
          )}
        </div>
      </div>
      <div className="flex-1 px-8 pb-8 min-h-0">
        <RaceTable query={query} />
      </div>
    </div>
  );
}

export default function RaceResultsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <RaceResultsContent />
    </Suspense>
  );
}
