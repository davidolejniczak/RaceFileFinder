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

interface Rider {
  riderId: string;
  riderName: string;
  riderCountry: string;
  riderCountryCode: string;
  teamName: string;
  riderAchievements?: string;
}

export default function RidersPage() {
  const [riders, setRiders] = useState<Rider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPopularRiders();
  }, []);

  const fetchPopularRiders = async () => {
    try {
      // TODO JAVA: Replace with actual API endpoint when available
      // add popular boolean column for all riders which is true if it should return for this
      // const response = await fetch(
      //   `https://cyclingfilefinder-25df5d1a64a0.herokuapp.com/api/riders/popular`
      // );

      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }

      // const data = await response.json();
      // const backendRiders = Array.isArray(data) ? data : [];
      // setRiders(backendRiders);

      // For now, use sample data for the 8 most popular riders
      const sampleRiders: Rider[] = [
        {
          riderId: "1",
          riderName: "Tadej Pogačar",
          riderCountry: "Slovenia",
          riderCountryCode: "SI",
          teamName: "UAE Team Emirates",
          riderAchievements: "2x Tour de France Winner"
        },
        {
          riderId: "2",
          riderName: "Jonas Vingegaard",
          riderCountry: "Denmark",
          riderCountryCode: "DK",
          teamName: "Jumbo-Visma",
          riderAchievements: "2x Tour de France Winner"
        },
        {
          riderId: "3",
          riderName: "Primož Roglič",
          riderCountry: "Slovenia",
          riderCountryCode: "SI",
          teamName: "Bora-Hansgrohe",
          riderAchievements: "3x Vuelta Winner"
        },
        {
          riderId: "4",
          riderName: "Remco Evenepoel",
          riderCountry: "Belgium",
          riderCountryCode: "BE",
          teamName: "Soudal Quick-Step",
          riderAchievements: "Vuelta Winner 2022"
        },
        {
          riderId: "5",
          riderName: "Egan Bernal",
          riderCountry: "Colombia",
          riderCountryCode: "CO",
          teamName: "INEOS Grenadiers",
          riderAchievements: "Tour de France Winner 2019"
        },
        {
          riderId: "6",
          riderName: "Wout van Aert",
          riderCountry: "Belgium",
          riderCountryCode: "BE",
          teamName: "Jumbo-Visma",
          riderAchievements: "Multiple Classics Winner"
        },
        {
          riderId: "7",
          riderName: "Mathieu van der Poel",
          riderCountry: "Netherlands",
          riderCountryCode: "NL",
          teamName: "Alpecin-Deceuninck",
          riderAchievements: "World Champion 2023"
        },
        {
          riderId: "8",
          riderName: "Peter Sagan",
          riderCountry: "Slovakia",
          riderCountryCode: "SK",
          teamName: "TotalEnergies",
          riderAchievements: "3x World Champion"
        }
      ];

      setRiders(sampleRiders);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/search/rider?query=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="h-full p-8 overflow-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">World Tour Riders</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
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
        <h1 className="text-3xl font-bold mb-6 text-gray-900">World Tour Riders</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">Error loading riders: {error}</p>
          </div>
        )}

        {/* Popular Riders Section */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {riders.map((rider) => (
              <Card key={rider.riderId} className="h-48 hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span 
                      className={`fi fi-${rider.riderCountryCode.toLowerCase()} w-8 h-6 rounded shadow-sm`}
                      title={rider.riderCountry}
                    ></span>
                    <CardTitle className="text-lg">{rider.riderName}</CardTitle>
                  </div>
                  <CardDescription>{rider.riderCountry}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-end">
                  <div className="space-y-1">
                    <div className="text-sm">
                      <span className="text-gray-600">Team: </span>
                      <span className="font-semibold">{rider.teamName}</span>
                    </div>
                    {rider.riderAchievements && (
                      <div className="text-xs text-gray-500">
                        {rider.riderAchievements}
                      </div>
                    )}
                  </div>
                  <div className="mt-1">
                    <Link
                      href={`/riders/${rider.riderId}`}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      View Profile →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {riders.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No riders found</p>
          </div>
        )}
      </div>
    </div>
  );
}
