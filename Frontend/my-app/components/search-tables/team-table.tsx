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
        `https://cyclingfilefinder-25df5d1a64a0.herokuapp.com/api/team/all?teamName=${encodeURIComponent(
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
          <TableCell colSpan={2} className="no-results-cell text-center h-24">
            Loading...
          </TableCell>
        </TableRow>
      );
    }

    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={2} className="no-results-cell text-center h-24">
            Error: {error}
          </TableCell>
        </TableRow>
      );
    }

    if (results.length === 0 && query) {
      return (
        <TableRow>
          <TableCell colSpan={2} className="no-results-cell text-center h-24">
            No results found for "{query}"
          </TableCell>
        </TableRow>
      );
    }

    if (results.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={2} className="no-results-cell text-center h-24">
            Enter a team name to see results
          </TableCell>
        </TableRow>
      );
    }

    return results.map((result, index) => (
      <TableRow key={index}>
        <TableCell className="border-r border-gray-200 break-words">
          {result.teamName}
        </TableCell>
        <TableCell className="text-left">
          <a
            href={result.teamUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            Visit Website
          </a>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="results-table-container">
      <div data-slot="table-container" className="relative w-full overflow-x-auto">
        <Table className="table-auto w-full bg-gray-50">
          <TableHeader>
            <TableRow className="border-b border-gray-800 bg-gray-200">
              <TableHead className="border-r border-gray-300 text-left">
                Team Name
              </TableHead>
              <TableHead className="text-left">
                Website
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{renderResults()}</TableBody>
        </Table>
      </div>
    </div>
  );
}
