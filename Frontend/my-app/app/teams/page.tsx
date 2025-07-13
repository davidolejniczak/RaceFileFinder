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
      const response = await fetch(
        `https://cyclingfilefinder-25df5d1a64a0.herokuapp.com/api/teams/all`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const backendTeams = Array.isArray(data) ? data : [];
      const mappedTeams: Team[] = backendTeams.map((team: any) => ({
        teamId: team.teamId?.toString() ?? team.id?.toString() ?? "",
        teamName: team.teamName ?? team.name ?? "",
        country: team.country ?? "",
        countryCode: team.countryCode ?? "",
        riderCount: team.riderCount ?? 0,
        bestResult: team.bestResult ?? "",
        teamUrl: team.teamUrl ?? undefined,
      }));
      setTeams(mappedTeams);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="h-full p-8 overflow-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">World Tour Teams</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="h-48 animate-pulse bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-6 bg-gray-200 rounded"></div>
                    <div className="h-6 bg-gray-200 rounded flex-1"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="h-full p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">World Tour Teams</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">Error loading teams: {error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teams.map((team) => (
            <Card key={team.teamId} className="h-48 hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span 
                    className={`fi fi-${team.countryCode.toLowerCase()} w-8 h-6 rounded shadow-sm`}
                    title={team.country}
                  ></span>
                  <CardTitle className="text-lg">{team.teamName}</CardTitle>
                </div>
                <CardDescription>{team.country}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-end">
                <div className="space-y-1">
                  <div className="text-sm">
                    <span className="text-gray-600">Riders: </span>
                    <span className="font-semibold">{team.riderCount}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {team.bestResult}
                  </div>
                </div>
                <div className="mt-1">
                  <Link
                    href={`/teams/${team.teamId}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    View Team →
                  </Link>
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
    </div>
  );
}
