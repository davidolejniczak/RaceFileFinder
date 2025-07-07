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
  country: string;
  countryCode: string;
  winner?: string;
  hasResults: boolean;
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
      
      // For now, use sample data with enhanced information
      const sampleRaces: Race[] = [
        {
          raceId: "1",
          raceName: "Tour de France",
          raceYear: "2024",
          country: "France",
          countryCode: "FR",
          winner: "Tadej Pogačar",
          hasResults: true
        },
        {
          raceId: "2",
          raceName: "Giro d'Italia",
          raceYear: "2024",
          country: "Italy",
          countryCode: "IT",
          winner: "Tadej Pogačar",
          hasResults: true
        },
        {
          raceId: "3",
          raceName: "La Vuelta",
          raceYear: "2024",
          country: "Spain",
          countryCode: "ES",
          hasResults: false
        },
        {
          raceId: "4",
          raceName: "Tour de France",
          raceYear: "2025",
          country: "France",
          countryCode: "FR",
          hasResults: false
        },
        {
          raceId: "5",
          raceName: "Giro d'Italia",
          raceYear: "2025",
          country: "Italy",
          countryCode: "IT",
          hasResults: false
        },
        {
          raceId: "6",
          raceName: "La Vuelta",
          raceYear: "2025",
          country: "Spain",
          countryCode: "ES",
          hasResults: false
        }
      ];
      
      setRaces(sampleRaces);
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {races.map((race) => (
          <Card key={race.raceId} className="h-48 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <span 
                  className={`fi fi-${race.countryCode.toLowerCase()} w-8 h-6 rounded shadow-sm`}
                  title={race.country}
                ></span>
                <CardTitle className="text-lg">{race.raceName}</CardTitle>
              </div>
              <CardDescription>{race.country} • {race.raceYear}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-end">
              <div className="space-y-1">
                {race.hasResults && race.winner ? (
                  <div className="text-sm">
                    <span className="text-gray-600">Winner: </span>
                    <span className="font-semibold">{race.winner}</span>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 italic">
                    Results not available yet
                  </div>
                )}
              </div>
              <div className="mt-1">
                {race.hasResults ? (
                  <Link
                    href={`/results/race?query=${encodeURIComponent(race.raceName)}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    View Results →
                  </Link>
                ) : (
                  <span className="text-gray-400 text-sm">
                    Coming Soon
                  </span>
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
  );
}
