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
  raceCountry: string;
  raceCountryCode: string;
  raceWinner?: string;
  raceHasResults: boolean;
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
      const response = await fetch(
        `https://cyclingfilefinder-25df5d1a64a0.herokuapp.com/api/race/all/all`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const backendRaces = Array.isArray(data) ? data : [];
      
        const mappedRaces: Race[] = backendRaces.map((race: any) => ({
          raceId: race.raceId?.toString() ?? race.id?.toString() ?? "",
          raceName: race.raceName ?? race.name ?? "",
          raceYear: race.raceYear?.toString() ?? race.year?.toString() ?? "",
          raceCountry: race.country ?? "",
          raceCountryCode: race.countryCode ?? "",
          raceWinner: race.raceWinner ?? race.winner ?? "",
          raceHasResults: race.raceHasResults ?? race.hasResults ?? false,
      }));
      
      setRaces(mappedRaces);
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
          <h1 className="text-3xl font-bold mb-6 text-gray-900">World Tour Races</h1>
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
        <h1 className="text-3xl font-bold mb-6 text-gray-900">World Tour Races</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">Error loading races: {error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {races.map((race) => (
            <Card key={race.raceId} className="h-48 hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span 
                    className={`fi fi-${race.raceCountryCode.toLowerCase()} w-8 h-6 rounded shadow-sm`}
                    title={race.raceCountry}
                  ></span>
                  {race.raceHasResults ? (
                    <Link 
                      href={`/results/race?query=${encodeURIComponent(race.raceName)}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      <CardTitle className="text-lg">{race.raceName}</CardTitle>
                    </Link>
                  ) : (
                    <CardTitle className="text-lg">{race.raceName}</CardTitle>
                  )}
                </div>
                <CardDescription>{race.raceCountry} {race.raceYear}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-end">
                <div className="space-y-1">
                  {race.raceHasResults && race.raceWinner ? (
                    <div className="text-sm">
                      <span className="text-gray-600">Winner: </span>
                      <span className="font-semibold">{race.raceWinner}</span>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 italic">
                      Results not available yet
                    </div>
                  )}
                </div>
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
    </div>
  );
}
