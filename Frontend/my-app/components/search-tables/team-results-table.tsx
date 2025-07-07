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
  position: string;
  raceName: string;
  riderName: string;
  countryCode: string;
  date: string;
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
      // TODO: Replace with actual API endpoint when available
      // const response = await fetch(
      //   `https://cyclingfilefinder-25df5d1a64a0.herokuapp.com/api/teams/${teamId}/best-results`
      // );

      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }

      // const data = await response.json();
      // const backendResults = Array.isArray(data) ? data : [];
      // setResults(backendResults);

      // For now, use sample data
      const sampleResults: TeamResult[] = [
        {
          position: "1st",
          raceName: "Tour de France 2024",
          riderName: "Tadej Pogačar",
          countryCode: "SI",
          date: "2024-07-21"
        },
        {
          position: "2nd",
          raceName: "Tour de France 2024",
          riderName: "Adam Yates",
          countryCode: "GB",
          date: "2024-07-21"
        },
        {
          position: "1st",
          raceName: "Liège-Bastogne-Liège 2024",
          riderName: "Tadej Pogačar",
          countryCode: "SI",
          date: "2024-04-21"
        },
        {
          position: "3rd",
          raceName: "Giro d'Italia 2024",
          riderName: "João Almeida",
          countryCode: "PT",
          date: "2024-05-26"
        },
        {
          position: "1st",
          raceName: "Volta a Catalunya 2024",
          riderName: "Tadej Pogačar",
          countryCode: "SI",
          date: "2024-03-24"
        }
      ];

      setResults(sampleResults);
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
          <TableCell colSpan={5} className="text-center h-24">
            Loading...
          </TableCell>
        </TableRow>
      );
    }

    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={5} className="text-center h-24">
            Error: {error}
          </TableCell>
        </TableRow>
      );
    }

    if (results.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={5} className="text-center h-24">
            No results found for this team
          </TableCell>
        </TableRow>
      );
    }

    return results.map((result, index) => (
      <TableRow key={index}>
        <TableCell className="border-r border-gray-200 whitespace-nowrap text-center">
          {result.position}
        </TableCell>
        <TableCell className="border-r border-gray-200 break-words">
          {result.raceName}
        </TableCell>
        <TableCell className="border-r border-gray-200 break-words">
          {result.riderName}
        </TableCell>
        <TableCell className="border-r border-gray-200 text-center">
          <span 
            className={`fi fi-${result.countryCode.toLowerCase()} w-5 h-4 rounded`}
            title={result.countryCode}
          ></span>
        </TableCell>
        <TableCell className="text-left whitespace-nowrap">
          {new Date(result.date).toLocaleDateString()}
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="results-table-container h-full flex flex-col">
      <div data-slot="table-container" className="relative w-full overflow-x-auto flex-1">
        <Table className="table-auto w-full bg-gray-50 h-full">
          <TableHeader className="sticky top-0 z-10">
            <TableRow className="border-b border-gray-800 bg-gray-200">
              <TableHead className="border-r border-gray-300 whitespace-nowrap w-16 text-center">
                Position
              </TableHead>
              <TableHead className="border-r border-gray-300 text-left">
                Race Name
              </TableHead>
              <TableHead className="border-r border-gray-300 text-left">
                Rider
              </TableHead>
              <TableHead className="border-r border-gray-300 text-center">
                Country
              </TableHead>
              <TableHead className="text-left">
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