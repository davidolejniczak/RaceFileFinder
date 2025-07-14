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

interface TeamRider {
  riderName: string;
  riderCountry: string;
  riderCountryCode: string;
  riderStrava?: string;
}

interface TeamRidersTableProps {
  teamId: string;
  teamName: string;
}

export default function TeamRidersTable({ teamId, teamName }: TeamRidersTableProps) {
  const [riders, setRiders] = useState<TeamRider[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (teamId) {
      fetchTeamRiders();
    }
  }, [teamId]);

  const fetchTeamRiders = async () => {
    setIsLoading(true);
    setError(null);
    setRiders([]);

    try {
      // TODO JAVA: Replace with actual API endpoint when available
      // Search riders by team and return all riders who have this team
      // const response = await fetch(
      //   `https://cyclingfilefinder-25df5d1a64a0.herokuapp.com/api/teams/${teamId}/riders`
      // );

      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }

      // const data = await response.json();
      // const backendRiders = Array.isArray(data) ? data : [];
      // setRiders(backendRiders);

      // For now, use sample data
      const sampleRiders: TeamRider[] = [
        {
          riderName: "Tadej Pogačar",
          riderCountry: "Slovenia",
          riderCountryCode: "SI",
          riderStrava: "https://www.strava.com/athletes/tadejpogacar"
        },
        {
          riderName: "Adam Yates",
          riderCountry: "Great Britain",
          riderCountryCode: "GB",
          riderStrava: "https://www.strava.com/athletes/adamyates"
        },
        {
          riderName: "João Almeida",
          riderCountry: "Portugal",
          riderCountryCode: "PT",
          riderStrava: "https://www.strava.com/athletes/joaoalmeida"
        },
        {
          riderName: "Marc Soler",
          riderCountry: "Spain",
          riderCountryCode: "ES",
          riderStrava: "https://www.strava.com/athletes/marcsoler"
        },
        {
          riderName: "Rafal Majka",
          riderCountry: "Poland",
          riderCountryCode: "PL",
          riderStrava: "https://www.strava.com/athletes/rafalmajka"
        }
      ];

      setRiders(sampleRiders);
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

    if (riders.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={3} className="text-center h-24 text-gray-500">
            No riders found for this team
          </TableCell>
        </TableRow>
      );
    }

    return riders.map((rider, index) => (
      <TableRow key={index} className="hover:bg-blue-50/50 transition-colors">
        <TableCell className="border-r border-gray-200 break-words font-medium">
          {rider.riderName}
        </TableCell>
        <TableCell className="border-r border-gray-200">
          <div className="flex items-center gap-2">
            <span 
              className={`fi fi-${rider.riderCountryCode.toLowerCase()} w-5 h-4 rounded shadow-sm`}
              title={rider.riderCountry}
            ></span>
            <span className="text-sm text-gray-600">{rider.riderCountry}</span>
          </div>
        </TableCell>
        <TableCell className="text-left">
          {rider.riderStrava ? (
            <a
              href={rider.riderStrava}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <span>View Strava</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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
              <TableHead className="border-r border-white/20 text-left font-semibold">
                Rider Name
              </TableHead>
              <TableHead className="border-r border-white/20 text-left font-semibold">
                Country
              </TableHead>
              <TableHead className="text-left font-semibold">
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