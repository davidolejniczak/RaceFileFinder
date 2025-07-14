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
import RiderTable from "@/components/search-tables/rider-table";

interface RiderProfile {
  riderId: string;
  riderName: string;
  riderCountry: string;
  riderCountryCode: string;
  teamName: string;
  riderAchievements?: string;
  riderStrava?: string;
}

export default function RiderProfilePage() {
  const params = useParams();
  const riderId = params.riderId as string;
  
  const [rider, setRider] = useState<RiderProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (riderId) {
      fetchRiderProfile();
    }
  }, [riderId]);

  const fetchRiderProfile = async () => {
    try {
      const response = await fetch(
        `https://cyclingfilefinder-25df5d1a64a0.herokuapp.com/api/riders/${riderId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRider(data);

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
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !rider) {
    return (
      <div className="h-full p-8 overflow-auto">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Rider Not Found</h1>
          <p className="text-gray-600 mb-4">{error || "The requested rider could not be found."}</p>
          <Link href="/riders" className="text-blue-600 hover:text-blue-800">
            ← Back to Riders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-8 overflow-auto">
      {/* Rider Info Card */}
      <div className="mb-6">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <div className="flex items-center gap-4">
              <span 
                className={`fi fi-${rider.riderCountryCode.toLowerCase()} w-12 h-9 rounded shadow-md`}
                title={rider.riderCountry}
              ></span>
              <div>
                <CardTitle className="text-2xl">{rider.riderName}</CardTitle>
                <CardDescription className="text-lg">{rider.riderCountry} • {rider.teamName}</CardDescription>
              </div>
              {rider.riderStrava && (
                <a
                  href={rider.riderStrava}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-blue-600 hover:text-blue-800 font-medium"
                >
                  Strava Profile →
                </a>
              )}
            </div>
          </CardHeader>
          {rider.riderAchievements && (
            <CardContent>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Achievements:</span> {rider.riderAchievements}
              </p>
            </CardContent>
          )}
        </Card>
      </div>

      {/* Race History Table */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Race History</h2>
        <div className="h-96">
          <RiderTable query={rider.riderName} />
        </div>
      </div>

    </div>
  );
} 