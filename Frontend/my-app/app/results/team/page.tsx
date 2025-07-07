"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TeamTable from "@/components/search-tables/team-table";

function TeamResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">
          Team Search Results
        </h1>
        {query && (
          <p className="text-muted-foreground">
            Results for: <span className="font-semibold text-blue-600">{query}</span>
          </p>
        )}
      </div>
      <TeamTable query={query} />
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
