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

interface TeamResult {
  riderPosition: string;
  raceName: string;
  riderName: string;
  riderCountryCode: string;
  raceDate: string;
}

interface TeamResultsTableProps {
  teamId: string;
  teamName: string;
}

export default function TeamResultsTable({ teamId, teamName }: TeamResultsTableProps) {
  const [results, setResults] = useState<TeamResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (teamId) {
      fetchTeamResults();
    }
  }, [teamId]);

  const fetchTeamResults = async () => {
    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      // tricky query check it out later
      const response = await fetch(
        `https://cyclingfilefinder-25df5d1a64a0.herokuapp.com/api/raceresults/${teamId}/results`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const backendResults = Array.isArray(data) ? data : [];
      setResults(backendResults);
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
          <TableCell colSpan={5} className="text-center h-24 text-gray-600">
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
          <TableCell colSpan={5} className="text-center h-24 text-red-600 bg-red-50">
            Error: {error}
          </TableCell>
        </TableRow>
      );
    }

    if (results.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={5} className="text-center h-24 text-gray-500">
            No results found for this team
          </TableCell>
        </TableRow>
      );
    }

    return results.map((result, index) => (
      <TableRow key={index} className="hover:bg-blue-50/50 transition-colors">
        <TableCell className="border-r border-gray-200 whitespace-nowrap text-center font-medium">
          {result.riderPosition}
        </TableCell>
        <TableCell className="border-r border-gray-200 break-words font-medium">
          {result.raceName}
        </TableCell>
        <TableCell className="border-r border-gray-200 break-words text-gray-600">
          {result.riderName}
        </TableCell>
        <TableCell className="border-r border-gray-200 text-center">
          <span 
            className={`fi fi-${result.riderCountryCode.toLowerCase()} w-5 h-4 rounded shadow-sm`}
            title={result.riderCountryCode}
          ></span>
        </TableCell>
        <TableCell className="text-left whitespace-nowrap text-gray-600">
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
              <TableHead className="border-r border-white/20 whitespace-nowrap w-16 text-center font-semibold">
                Position
              </TableHead>
              <TableHead className="border-r border-white/20 text-left font-semibold">
                Race Name
              </TableHead>
              <TableHead className="border-r border-white/20 text-left font-semibold">
                Rider
              </TableHead>
              <TableHead className="border-r border-white/20 text-center font-semibold">
                Country
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