"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

interface RaceResult {
  raceName: string;
  riderPosition: string;
  riderName: string;
  riderStrava: string;
}

interface RaceTableProps {
  query?: string | null;
}

export default function RaceTable({ query }: RaceTableProps) {
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

  return (
    <div className="results-table-container h-full flex flex-col">
      <div data-slot="table-container" className="relative w-full overflow-x-auto flex-1">
        <Table className="table-auto w-full bg-gray-50 h-full">
          <TableHeader className="sticky top-0 z-10">
            <TableRow className="border-b border-gray-800 bg-gray-200">
              <TableHead className="border-r border-gray-300 whitespace-nowrap w-24 text-center">
                Position
              </TableHead>
              <TableHead className="border-r border-gray-300 text-left">
                Rider Name
              </TableHead>
              <TableHead className="text-right whitespace-nowrap w-36 text-left">
                Strava Link
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-y-auto">
            {!isLoading && raceResults.length > 0 ? (
              raceResults.map((result, index) => (
                <TableRow key={`${index}-${result.riderName || "unknown"}`}>
                  <TableCell className="border-r border-gray-200 whitespace-nowrap text-center">
                    {result.riderPosition}
                  </TableCell>
                  <TableCell className="border-r border-gray-200 break-words">
                    {result.riderName}
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap">
                    {result.riderStrava ? (
                      <a
                        href={result.riderStrava}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View Activity
                      </a>
                    ) : (
                      <span className="text-gray-500">Not Available</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="no-results-cell text-center h-24"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : noResultsFound ? (
              <TableRow className="no-results-row">
                <TableCell
                  colSpan={3}
                  className="no-results-cell text-center h-24"
                >
                  No results found for "{query}"
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="no-results-cell text-center h-24"
                >
                  Enter a race name to see results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}