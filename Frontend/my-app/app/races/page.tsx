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

interface Race {
  raceId: string;
  raceName: string;
  raceYear: string;
  // raceCountry: string; TODO: Add this to the backend
}

export default function RacesPage() {
  const [races, setRaces] = useState<Race[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRaces();
  }, []);

  const fetchRaces = async () => {
    try {
      // TODO: change to all races
      const response = await fetch(
        `https://cyclingfilefinder-25df5d1a64a0.herokuapp.com/api/race/all?raceName=Tour`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const backendRaces = Array.isArray(data) ? data : [];
      setRaces(backendRaces);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">World Tour Races</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="h-48 animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
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
    );
  }

  return (
    <div className="h-full p-8 overflow-auto">
      <h1 className="text-3xl font-bold mb-6">World Tour Races</h1>
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">Error loading races: {error}</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {races.map((race) => (
          <Card key={race.raceId} className="h-48 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{race.raceName}</CardTitle>
              <CardDescription>Year: {race.raceYear}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-end">
              <Link
                href={`/results/race?query=${encodeURIComponent(race.raceName)}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View Results →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      {races.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No races found</p>
        </div>
      )}
    </div>
  );
}
