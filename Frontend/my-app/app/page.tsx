"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Trophy, Users, User, ArrowRight, Star, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"rider" | "race" | "team">("rider");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/search/${searchType}?query=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const featuredRaces = [
    {
      name: "Tour de France",
      country: "France",
      countryCode: "FR",
      description: "The world's most prestigious cycling race",
      hasResults: true
    },
    {
      name: "Giro d'Italia",
      country: "Italy", 
      countryCode: "IT",
      description: "The beautiful race through Italy",
      hasResults: true
    },
    {
      name: "La Vuelta Ciclista a España",
      country: "Spain",
      countryCode: "ES", 
      description: "The Spanish grand tour",
      hasResults: false
    }
  ];

  const featuredTeams = [
    {
      name: "UAE Team Emirates",
      country: "UAE",
      countryCode: "AE",
      riders: 28,
      achievements: "Tour de France Champions"
    },
    {
      name: "INEOS Grenadiers", 
      country: "Great Britain",
      countryCode: "GB",
      riders: 30,
      achievements: "Multiple Grand Tour Wins"
    },
    {
      name: "Jumbo-Visma",
      country: "Netherlands", 
      countryCode: "NL",
      riders: 29,
      achievements: "Tour de France Champions"
    }
  ];

  const featuredRiders = [
    {
      name: "Tadej Pogačar",
      country: "Slovenia",
      countryCode: "SI",
      team: "UAE Team Emirates",
      achievements: "2x Tour de France Winner"
    },
    {
      name: "Jonas Vingegaard",
      country: "Denmark",
      countryCode: "DK", 
      team: "Jumbo-Visma",
      achievements: "2x Tour de France Winner"
    },
    {
      name: "Remco Evenepoel",
      country: "Belgium",
      countryCode: "BE",
      team: "Soudal Quick-Step", 
      achievements: "Vuelta Winner 2022"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-green-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Pro Cyclists on
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600"> Strava</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover professional cyclists' Strava profiles, explore race results, and browse team rosters. 
              The ultimate platform for cycling enthusiasts and professionals.
            </p>
            
            {/* Search Section */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Search for riders, races, or teams..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="h-12 text-lg border-0 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value as "rider" | "race" | "team")}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="rider">Riders</option>
                      <option value="race">Races</option>
                      <option value="team">Teams</option>
                    </select>
                    <Button 
                      onClick={handleSearch}
                      className="h-12 px-8 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    >
                      <Search className="w-5 h-5 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600">Pro Riders</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">30+</div>
                <div className="text-gray-600">World Tour Races</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">18</div>
                <div className="text-gray-600">World Tour Teams</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Races Section */}
      <section className="py-15 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Races
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the most prestigious cycling races and their results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredRaces.map((race, index) => (
              <Card key={index} className="h-48 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span 
                      className={`fi fi-${race.countryCode.toLowerCase()} w-8 h-6 rounded shadow-sm`}
                      title={race.country}
                    ></span>
                    <CardTitle className="text-lg">{race.name}</CardTitle>
                  </div>
                  <CardDescription>{race.country} • {race.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-end">
                  <div className="space-y-1">
                    {race.hasResults ? (
                      <div className="text-sm">
                        <span className="text-gray-600">Results available</span>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 italic">
                        Results coming soon
                      </div>
                    )}
                  </div>
                  <div className="mt-1">
                    {race.hasResults ? (
                      <Link
                        href={`/results/race?query=${encodeURIComponent(race.name)}`}
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

          <div className="text-center">
            <Link href="/races">
              <Button variant="outline" className="group">
                View All Races
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Teams Section */}
      <section className="py-15 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Teams
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the world's top cycling teams and their riders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredTeams.map((team, index) => (
              <Card key={index} className="h-48 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span 
                      className={`fi fi-${team.countryCode.toLowerCase()} w-8 h-6 rounded shadow-sm`}
                      title={team.country}
                    ></span>
                    <CardTitle className="text-lg">{team.name}</CardTitle>
                  </div>
                  <CardDescription>{team.country}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-end">
                  <div className="space-y-1">
                    <div className="text-sm">
                      <span className="text-gray-600">Riders: </span>
                      <span className="font-semibold">{team.riders}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {team.achievements}
                    </div>
                  </div>
                  <div className="mt-1">
                    <Link
                      href={`/teams/${index + 1}`}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      View Team →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/teams">
              <Button variant="outline" className="group">
                View All Teams
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Riders Section */}
      <section className="py-15 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Riders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the world's top cyclists and find their Strava profiles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredRiders.map((rider, index) => (
              <Card key={index} className="h-48 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span 
                      className={`fi fi-${rider.countryCode.toLowerCase()} w-8 h-6 rounded shadow-sm`}
                      title={rider.country}
                    ></span>
                    <CardTitle className="text-lg">{rider.name}</CardTitle>
                  </div>
                  <CardDescription>{rider.country}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-end">
                  <div className="space-y-1">
                    <div className="text-sm">
                      <span className="text-gray-600">Team: </span>
                      <span className="font-semibold">{rider.team}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {rider.achievements}
                    </div>
                  </div>
                  <div className="mt-1">
                    <Link
                      href={`/riders/${index + 1}`}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      View Profile →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/riders">
              <Button variant="outline" className="group">
                View All Riders
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-2xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Open Source Project
          </h2>
          <p className="text-lg text-blue-100 mb-6">
            This project is open source. Check out the code on GitHub!
          </p>
          <a 
            href="https://github.com/davidolejniczak/RaceFileFinder" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
        </div>
      </section>
    </div>
  );
}
