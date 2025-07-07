"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Team {
  teamId: string;
  teamName: string;
  country: string;
  countryCode: string;
  riderCount: number;
  bestResult: string;
  teamUrl?: string;
}

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      // TODO: Replace with actual API endpoint when available
      // const response = await fetch(
      //   `https://cyclingfilefinder-25df5d1a64a0.herokuapp.com/api/teams/all`
      // );
      
      // For now, use sample data
      const sampleTeams: Team[] = [
        {
          teamId: "1",
          teamName: "UAE Team Emirates",
          country: "United Arab Emirates",
          countryCode: "AE",
          riderCount: 0,
          bestResult: "",
          teamUrl: "https://www.uaeteamemirates.com"
        },
        {
          teamId: "2",
          teamName: "INEOS Grenadiers",
          country: "Great Britain",
          countryCode: "GB",
          riderCount: 0,
          bestResult: "",
          teamUrl: "https://www.ineosgrenadiers.com"
        },
        {
          teamId: "3",
          teamName: "Jumbo-Visma",
          country: "Netherlands",
          countryCode: "NL",
          riderCount: 0,
          bestResult: "",
          teamUrl: "https://www.teamjumbovisma.nl"
        },
        {
          teamId: "4",
          teamName: "Soudal Quick-Step",
          country: "Belgium",
          countryCode: "BE",
          riderCount: 0,
          bestResult: "",
          teamUrl: "https://www.soudal-quickstepteam.com"
        },
        {
          teamId: "5",
          teamName: "Bora-Hansgrohe",
          country: "Germany",
          countryCode: "DE",
          riderCount: 0,
          bestResult: "",
          teamUrl: "https://www.bora-hansgrohe.com"
        },
        {
          teamId: "6",
          teamName: "Movistar Team",
          country: "Spain",
          countryCode: "ES",
          riderCount: 0,
          bestResult: "",
          teamUrl: "https://www.movistarteam.com"
        }
      ];

      // Fetch rider counts and best results for each team
      const teamsWithData = await Promise.all(
        sampleTeams.map(async (team) => {
          try {
            // TODO: Replace with actual API endpoints when available
            // Fetch rider count for the team
            // const riderCountResponse = await fetch(
            //   `https://cyclingfilefinder-25df5d1a64a0.herokuapp.com/api/teams/${team.teamId}/rider-count`
            // );
            // const riderCountData = await riderCountResponse.json();
            
            // Fetch best result for the team
            // const bestResultResponse = await fetch(
            //   `https://cyclingfilefinder-25df5d1a64a0.herokuapp.com/api/teams/${team.teamId}/best-result`
            // );
            // const bestResultData = await bestResultResponse.json();

            // For now, use placeholder data
            const riderCount = Math.floor(Math.random() * 30) + 20; // Random number between 20-50
            const bestResult = "1st Place - Tour de France 2024"; // Placeholder best result

            return {
              ...team,
              riderCount,
              bestResult
            };
          } catch (error) {
            console.error(`Error fetching data for team ${team.teamName}:`, error);
            return {
              ...team,
              riderCount: 0,
              bestResult: "Data unavailable"
            };
          }
        })
      );
      
      setTeams(teamsWithData);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">World Tour Teams</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="h-64 animate-pulse">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-6 bg-gray-200 rounded"></div>
                  <div className="h-6 bg-gray-200 rounded flex-1"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-8 overflow-auto">
      <h1 className="text-3xl font-bold mb-6">World Tour Teams</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {teams.map((team) => (
          <Card key={team.teamId} className="h-64 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 ">
                <span 
                  className={`fi fi-${team.countryCode.toLowerCase()} w-8 h-6 rounded shadow-sm`}
                  title={team.country}
                ></span>
                <CardTitle className="text-lg">{team.teamName}</CardTitle>
              </div>
              <CardDescription>{team.country}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <div className="space-y-0">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Riders:</span>
                  <span className="font-semibold">{team.riderCount}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Best Result:</span>
                  <div className="font-semibold text-xs mt-1">{team.bestResult}</div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Link
                  href={`/teams/${team.teamId}`}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  View Riders →
                </Link>
                {team.teamUrl && (
                  <a
                    href={team.teamUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800 font-medium text-sm block"
                  >
                    Team Website →
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {teams.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No teams found</p>
        </div>
      )}
    </div>
  );
}
