"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TeamRidersTable from "@/components/search-tables/team-riders-table";
import TeamResultsTable from "@/components/search-tables/team-results-table";

interface Team {
  teamID: string;
  teamName: string;
  teamCountry: string;
  riderCount: number;
  teamBestResult: string;
  countryCode: string;
  teamUrl?: string;
}

export default function TeamRidersPage() {
  const params = useParams();
  const teamId = params.teamId as string;
  
  const [team, setTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (teamId) {
      fetchTeamInfo();
    }
  }, [teamId]);

  const fetchTeamInfo = async () => {
    try {
      const response = await fetch(
        `https://cyclingfilefinder-25df5d1a64a0.herokuapp.com/api/teams/results?teamID=${encodeURIComponent(
          teamId
        )}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTeam(data);

    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full p-8 overflow-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="h-32 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !team) {
    return (
      <div className="h-full p-8 overflow-auto">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Team Not Found</h1>
          <p className="text-gray-600 mb-4">{error || "The requested team could not be found."}</p>
          <Link href="/teams" className="text-blue-600 hover:text-blue-800">
            ← Back to Teams
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-8 overflow-auto">
      {/* Team Info Card */}
      <div className="mb-6">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <div className="flex items-center gap-4">
              <span 
                className={`fi fi-${team.countryCode.toLowerCase()} w-12 h-9 rounded shadow-md`}
                title={team.teamCountry}
              ></span>
              <div>
                <CardTitle className="text-2xl">{team.teamName}</CardTitle>
                <CardDescription className="text-lg">{team.teamCountry}</CardDescription>
              </div>
              {team.teamUrl && (
                <a
                  href={team.teamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-blue-600 hover:text-blue-800 font-medium"
                >
                  Team Website →
                </a>
              )}
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100%-200px)]">
        {/* Team Riders Table with Error Boundary */}
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Team Riders</h2>
          <div className="flex-1 min-h-0">
            <ErrorBoundary fallback={ 
              <div className="h-full flex items-center justify-center bg-red-50 border border-red-200 rounded-lg">
                <div className="text-center p-4">
                  <p className="text-red-600 font-medium">Failed to load team riders</p>
                  <p className="text-red-500 text-sm mt-1">This component encountered an error</p>
                </div>
              </div>
            }>
              <TeamRidersTable teamId={team.teamID} teamName={team.teamName} />
            </ErrorBoundary>
          </div>
        </div>

        {/* Team Results Table with Error Boundary */}
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Best Results</h2>
          <div className="flex-1 min-h-0">
            <ErrorBoundary fallback={
              <div className="h-full flex items-center justify-center bg-red-50 border border-red-200 rounded-lg">
                <div className="text-center p-4">
                  <p className="text-red-600 font-medium">Failed to load team results</p>
                  <p className="text-red-500 text-sm mt-1">This component encountered an error</p>
                </div>
              </div>
            }>
              <TeamResultsTable teamId={team.teamID} teamName={team.teamName} />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}