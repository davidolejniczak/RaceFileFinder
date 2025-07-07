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
  country: string;
  countryCode: string;
  stravaLink?: string;
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
      // TODO: Replace with actual API endpoint when available
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
          country: "Slovenia",
          countryCode: "SI",
          stravaLink: "https://www.strava.com/athletes/tadejpogacar"
        },
        {
          riderName: "Adam Yates",
          country: "Great Britain",
          countryCode: "GB",
          stravaLink: "https://www.strava.com/athletes/adamyates"
        },
        {
          riderName: "João Almeida",
          country: "Portugal",
          countryCode: "PT",
          stravaLink: "https://www.strava.com/athletes/joaoalmeida"
        },
        {
          riderName: "Marc Soler",
          country: "Spain",
          countryCode: "ES",
          stravaLink: "https://www.strava.com/athletes/marcsoler"
        },
        {
          riderName: "Rafal Majka",
          country: "Poland",
          countryCode: "PL",
          stravaLink: "https://www.strava.com/athletes/rafalmajka"
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
          <TableCell colSpan={3} className="text-center h-24">
            Loading...
          </TableCell>
        </TableRow>
      );
    }

    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={3} className="text-center h-24">
            Error: {error}
          </TableCell>
        </TableRow>
      );
    }

    if (riders.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={3} className="text-center h-24">
            No riders found for this team
          </TableCell>
        </TableRow>
      );
    }

    return riders.map((rider, index) => (
      <TableRow key={index}>
        <TableCell className="border-r border-gray-200 break-words">
          {rider.riderName}
        </TableCell>
        <TableCell className="border-r border-gray-200">
          <div className="flex items-center gap-2">
            <span 
              className={`fi fi-${rider.countryCode.toLowerCase()} w-5 h-4 rounded`}
              title={rider.country}
            ></span>
            <span className="text-sm">{rider.country}</span>
          </div>
        </TableCell>
        <TableCell className="text-left">
          {rider.stravaLink ? (
            <a
              href={rider.stravaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              View Strava
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
      <div data-slot="table-container" className="relative w-full overflow-x-auto flex-1">
        <Table className="table-auto w-full bg-gray-50 h-full">
          <TableHeader className="sticky top-0 z-10">
            <TableRow className="border-b border-gray-800 bg-gray-200">
              <TableHead className="border-r border-gray-300 text-left">
                Rider Name
              </TableHead>
              <TableHead className="border-r border-gray-300 text-left">
                Country
              </TableHead>
              <TableHead className="text-left">
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