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
  riderPosition: string;
  raceName: string;
  raceDate: string;
}

interface RiderResult {
  riderName: string;
  riderTeam: string;
  riderCountry: string;
  riderCountryCode: string;
  riderStrava: string;
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
        `https://cyclingfilefinder-25df5d1a64a0.herokuapp.com/api/rider/page?riderName=${encodeURIComponent(searchQuery)}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const rider = Array.isArray(data) && data.length > 0 ? data[0] : null;
      if (!rider) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      // TODO JAVA
      let raceResults: RaceResult[] = [];
      try {
        const raceResultsResponse = await fetch(
          `https://cyclingfilefinder-25df5d1a64a0.herokuapp.com/api/race/results?riderName=${encodeURIComponent(rider.riderName)}`
        );
        if (raceResultsResponse.ok) {
          const raceResultsData = await raceResultsResponse.json();
          raceResults = Array.isArray(raceResultsData)
            ? raceResultsData.map((result: any) => ({
                riderPosition: result.position?.toString() ?? "",
                raceName: result.raceName ?? result.race ?? "",
                raceDate: result.date ?? result.raceDate ?? "",
              }))
            : [];
        }
      } catch (err) {}

      const riderResult: RiderResult = {
        riderName: rider.riderName || rider.name || "Rider",
        riderTeam: rider.teamName || "Team Unknown",
        riderCountry: rider.country || "Unknown",
        riderCountryCode: rider.countryCode || "XX",
        riderStrava: rider.stravaLink || "#",
        raceResults,
      };
      setResults([riderResult]);
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
    allRaceResults.sort((a, b) => new Date(b.raceDate).getTime() - new Date(a.raceDate).getTime());

    return allRaceResults.map((result, index) => (
      <TableRow key={index} className="hover:bg-blue-50/50 transition-colors">
        <TableCell className="border-r border-gray-200 text-center font-medium">
          {result.riderPosition}
        </TableCell>
        <TableCell className="border-r border-gray-200 break-words font-medium">
          {result.raceName}
        </TableCell>
        <TableCell className="text-gray-600">
          {new Date(result.raceDate).toLocaleDateString()}
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
