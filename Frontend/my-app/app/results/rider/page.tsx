"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TeamTable from "@/components/search-tables/rider-table";

function TeamResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 p-8 pb-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            Rider Search Results
          </h1>
          {query && (
            <p className="text-muted-foreground">
              Results for: <span className="font-semibold text-blue-600">{query}</span>
            </p>
          )}
        </div>
      </div>
      <div className="flex-1 px-8 pb-8 min-h-0">
        <TeamTable query={query} />
      </div>
    </div>
  );
}

export default function TeamResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TeamResultsContent />
    </Suspense>
  );
}
