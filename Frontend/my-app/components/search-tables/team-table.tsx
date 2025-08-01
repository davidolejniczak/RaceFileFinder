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
  teamName: string; 
  teamUrl: string;
}

interface TeamTableProps {
  query?: string | null;
}

export default function TeamTable({ query }: TeamTableProps) {
  const [results, setResults] = useState<TeamResult[]>([]);
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
        `https://cyclingfilefinder-25df5d1a64a0.herokuapp.com/api/teams/all?teamName=${encodeURIComponent(
          searchQuery
        )}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResults(Array.isArray(data) ? data : []);
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
          <TableCell colSpan={2} className="text-center h-24 text-gray-600">
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
          <TableCell colSpan={2} className="text-center h-24 text-red-600 bg-red-50">
            Error: {error}
          </TableCell>
        </TableRow>
      );
    }

    if (results.length === 0 && query) {
      return (
        <TableRow>
          <TableCell colSpan={2} className="text-center h-24 text-gray-500">
            No results found for "{query}"
          </TableCell>
        </TableRow>
      );
    }

    if (results.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={2} className="text-center h-24 text-gray-500">
            Enter a team name to see results
          </TableCell>
        </TableRow>
      );
    }

    return results.map((result, index) => (
      <TableRow key={index} className="hover:bg-blue-50/50 transition-colors">
        <TableCell className="border-r border-gray-200 break-words font-medium">
          {result.teamName}
        </TableCell>
        <TableCell className="text-left">
          <a
            href={result.teamUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <span>Visit Website</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
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
              <TableHead className="border-r border-white/20 text-left font-semibold">
                Team Name
              </TableHead>
              <TableHead className="text-left font-semibold">
                Website
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-y-auto">{renderResults()}</TableBody>
        </Table>
      </div>
    </div>
  );
}
