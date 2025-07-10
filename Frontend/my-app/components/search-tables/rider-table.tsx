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
  position: string;
  raceName: string;
  date: string;
}

interface RiderResult {
  riderName: string;
  teamName: string;
  country: string;
  countryCode: string;
  stravaLink: string;
  raceResults: RaceResult[];
}

interface RiderTableProps {
  query?: string | null;
}

export default function RiderTable({ query }: RiderTableProps) {
  const [results, setResults] = useState<RiderResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      fetchResults(query);
    }
  }, [query]);

  const fetchResults = async (searchQuery: string) => {
    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await fetch(
        `https://cyclingfilefinder-25df5d1a64a0.herokuapp.com/api/rider/all?riderName=${encodeURIComponent(
          searchQuery
        )}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const backendResults = Array.isArray(data) ? data : [];
      
      // For now, add sample race results to demonstrate the enhanced table
      const enhancedResults: RiderResult[] = backendResults.map((rider: any, index: number) => ({
        riderName: rider.riderName || `Rider ${index + 1}`,
        teamName: rider.teamName || "Team Unknown",
        country: rider.country || "Unknown",
        countryCode: rider.countryCode || "XX",
        stravaLink: rider.stravaLink || "#",
        raceResults: [
          {
            position: "1st",
            raceName: "Tour de France 2024",
            date: "2024-07-21"
          },
          {
            position: "2nd",
            raceName: "Giro d'Italia 2024",
            date: "2024-05-26"
          },
          {
            position: "1st",
            raceName: "Liège-Bastogne-Liège 2024",
            date: "2024-04-21"
          },
          {
            position: "3rd",
            raceName: "Vuelta a España 2023",
            date: "2023-09-17"
          },
          {
            position: "1st",
            raceName: "Volta a Catalunya 2024",
            date: "2024-03-24"
          },
          {
            position: "2nd",
            raceName: "Tour de France 2023",
            date: "2023-07-23"
          }
        ]
      }));
      
      setResults(enhancedResults);
    } catch (e: any) {
      setError(e.message);
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

    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={3} className="text-center h-24 text-red-600 bg-red-50">
            Error: {error}
          </TableCell>
        </TableRow>
      );
    }

    if (results.length === 0 && query) {
      return (
        <TableRow>
          <TableCell colSpan={3} className="text-center h-24 text-gray-500">
            No results found for "{query}"
          </TableCell>
        </TableRow>
      );
    }

    if (results.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={3} className="text-center h-24 text-gray-500">
            Enter a rider name to see results
          </TableCell>
        </TableRow>
      );
    }

    // Flatten all race results from all riders into a single list
    const allRaceResults: RaceResult[] = [];
    results.forEach(rider => {
      rider.raceResults.forEach(race => {
        allRaceResults.push(race);
      });
    });

    // Sort by date (most recent first)
    allRaceResults.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return allRaceResults.map((result, index) => (
      <TableRow key={index} className="hover:bg-blue-50/50 transition-colors">
        <TableCell className="border-r border-gray-200 text-center font-medium">
          {result.position}
        </TableCell>
        <TableCell className="border-r border-gray-200 break-words font-medium">
          {result.raceName}
        </TableCell>
        <TableCell className="text-gray-600">
          {new Date(result.date).toLocaleDateString()}
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
              <TableHead className="border-r border-white/20 text-center font-semibold">
                Position
              </TableHead>
              <TableHead className="border-r border-white/20 text-left font-semibold">
                Race Name
              </TableHead>
              <TableHead className="text-left font-semibold">
                Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-y-auto">{renderResults()}</TableBody>
        </Table>
      </div>
    </div>
  );
}
