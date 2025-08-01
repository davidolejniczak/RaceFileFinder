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

  useEffect(() => {
    if (query) {
      fetchResults(query);
    }
  }, [query]);

  const fetchResults = async (raceNameInput: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://cyclingfilefinder-25df5d1a64a0.herokuapp.com/api/raceresults/r?racename=${encodeURIComponent(
          raceNameInput
        )}`
      );
      
      const data = await response.json();
      const backendRaceResults = Array.isArray(data) ? data : [];
      setRaceResults(backendRaceResults);
    } catch (error) {
      console.error('Error fetching race results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderResults = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={3} className="text-center h-24 text-gray-600">
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              Loading...
            </div>
          </TableCell>
        </TableRow>
      );
    }

    if (raceResults.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={3} className="text-center h-24 text-gray-500">
            {query ? `No results for "${query}"` : "Enter a race name to see results"}
          </TableCell>
        </TableRow>
      );
    }

    return raceResults.map((result, index) => (
      <TableRow key={`${index}-${result.riderName || "unknown"}`} className="hover:bg-blue-50/50 transition-colors">
        <TableCell className="border-r border-gray-200 whitespace-nowrap text-center font-medium">
          {/* Render DNF for 500 and DNS for 501 */}
          {result.riderPosition === "500"
            ? "DNF"
            : result.riderPosition === "501"
            ? "DNS"
            : result.riderPosition}
        </TableCell>
        <TableCell className="border-r border-gray-200 break-words font-medium">
          {result.riderName}
        </TableCell>
        <TableCell className="text-right whitespace-nowrap">
          {result.riderStrava ? (
            <a
              href={result.riderStrava}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <span>View Rider Profile</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          ) : (
            <span className="text-gray-500">Not Available</span>
          )}
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="results-table-container h-full flex flex-col">
      <div data-slot="table-container" className="relative w-full overflow-x-auto flex-1 rounded-lg border border-gray-200 shadow-sm">
        <Table className="table-auto w-full bg-white h-full">
          <TableHeader className="sticky top-0 z-10">
            <TableRow className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
              <TableHead className="border-r border-white/20 whitespace-nowrap w-24 text-center font-semibold">
                Position
              </TableHead>
              <TableHead className="border-r border-white/20 text-left font-semibold">
                Rider Name
              </TableHead>
              <TableHead className="text-right whitespace-nowrap w-36 font-semibold">
                Strava Link
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-y-auto">{renderResults()}</TableBody>
        </Table>
      </div>
    </div>
  );
}