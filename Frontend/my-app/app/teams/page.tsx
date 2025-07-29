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
  teamID: string;
  teamName: string;
  teamCountry: string;
  countrycode: string;
  teamRiderCount: number;
  teamBestResult: string;
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
          teamID: team.id || team.teamID,
          teamName: team.name || team.teamName,
          teamCountry: team.country || team.teamCountry,
          countrycode: team.countryCode || team.countrycode,
          teamRiderCount: team.riderCount || team.teamRiderCount || 0,
          teamBestResult: team.bestResult || team.teamBestResult || '',
          teamUrl: team.url || team.teamUrl
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
            <Card key={team.teamID} className="flex flex-col h-[200px] hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm border-0 shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3 min-w-0">
                  <span 
                    className={`fi fi-${team.countrycode.toLowerCase()} w-8 h-6 rounded shadow-sm flex-shrink-0`}
                    title={team.teamCountry}
                  ></span>
                  <Link href={`/teams/${team.teamID}`} className="min-w-0 flex-1">
                    <CardTitle className="text-lg truncate hover:text-blue-600 transition-colors">
                      {team.teamName}
                    </CardTitle>
                  </Link>
                </div>
                <CardDescription className="truncate">{team.teamCountry}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col h-full pt-2 pb-3">
                <div className="flex-1 min-h-0">
                  <div className="text-sm">
                    <span className="text-gray-600">Riders: </span>
                    <span className="font-semibold">{team.teamRiderCount}</span>
                  </div>
                  <div className="text-xs text-gray-500 line-clamp-2 mt-1">
                    {team.teamBestResult}
                  </div>
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
