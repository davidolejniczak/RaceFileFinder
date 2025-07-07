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

  useEffect(() => {
    if (query) {
      fetchResults(query);
    }
  }, [query]);

  const fetchResults = async (raceNameInput: string) => {
    const response = await fetch(
      `https://cyclingfilefinder-25df5d1a64a0.herokuapp.com/api/raceresults/r?racename=${encodeURIComponent(
        raceNameInput
      )}`
    );
    
    const data = await response.json();
    const backendRaceResults = Array.isArray(data) ? data : [];
    setRaceResults(backendRaceResults);
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
            {raceResults.length > 0 ? (
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
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="no-results-cell text-center h-24"
                >
                  {query ? `No results for "${query}"` : "Enter a race name to see results"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}