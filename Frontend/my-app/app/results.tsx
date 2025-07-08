"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RaceResult {
  raceName: string;
  riderPosition: string;
  riderName: string;
  riderStrava: string;
}

export default function Results() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  
  const [raceResults, setRaceResults] = useState<RaceResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noResultsFound, setNoResultsFound] = useState(false);

  useEffect(() => {
    if (query) {
      fetchResults(query);
    }
  }, [query]);

  const fetchResults = async (raceNameInput: string) => {
    setIsLoading(true);
    setError(null);
    setRaceResults([]);
    setNoResultsFound(false);

    try {
      const response = await fetch(
        `https://cyclingfilefinder-25df5d1a64a0.herokuapp.com/api/raceresults/r?racename=${encodeURIComponent(
          raceNameInput
        )}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const backendRaceResults = Array.isArray(data) ? data : [];
      setRaceResults(backendRaceResults);

      if (backendRaceResults.length === 0) {
        setNoResultsFound(true);
      }
    } catch (e: any) {
      setError(e.message);
      setNoResultsFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Race Results</h1>
        {query && <p className="text-gray-600 mb-6">Results for: {query}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <Card key={index} className="h-32 animate-pulse">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-6 bg-gray-200 rounded"></div>
                  <div className="h-6 bg-gray-200 rounded flex-1"></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-8 overflow-auto">
      <h1 className="text-3xl font-bold mb-6">Race Results</h1>
      
      {query && <p className="text-gray-600 mb-6">Results for: {query}</p>}
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">Error loading results: {error}</p>
        </div>
      )}

      {!isLoading && raceResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {raceResults.map((result, index) => (
            <Card key={`${index}-${result.riderName || "unknown"}`} className="h-32 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-6 bg-blue-100 rounded flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">{result.riderPosition}</span>
                  </div>
                  <CardTitle className="text-lg">{result.riderName}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-end">
                {result.riderStrava && (
                  <a
                    href={result.riderStrava}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    View Strava Activity →
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : noResultsFound ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No results found for "{query}"</p>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Enter a race name to see results</p>
        </div>
      )}
    </div>
  );
}