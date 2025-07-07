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
      name: "Tour de France 2025",
      country: "France",
      countryCode: "FR",
      description: "The world's most prestigious cycling race",
      image: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa5?w=400&h=250&fit=crop"
    },
    {
      name: "Giro d'Italia 2025",
      country: "Italy", 
      countryCode: "IT",
      description: "The beautiful race through Italy",
      image: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa5?w=400&h=250&fit=crop"
    },
    {
      name: "La Vuelta 2025",
      country: "Spain",
      countryCode: "ES", 
      description: "The Spanish grand tour",
      image: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa5?w=400&h=250&fit=crop"
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
                <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
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

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Cycling
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From finding your favorite riders on Strava to exploring race results and team rosters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow border-0 shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl mb-4">Find Riders</CardTitle>
              <CardDescription className="text-lg mb-6">
                Discover professional cyclists and their Strava profiles. Follow their training and racing activities.
              </CardDescription>
              <Link href="/riders">
                <Button variant="outline" className="group">
                  Browse Riders
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow border-0 shadow-md">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl mb-4">Race Results</CardTitle>
              <CardDescription className="text-lg mb-6">
                Explore complete race results with rider positions and direct links to their Strava activities.
              </CardDescription>
              <Link href="/races">
                <Button variant="outline" className="group">
                  View Races
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow border-0 shadow-md">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-2xl mb-4">Team Rosters</CardTitle>
              <CardDescription className="text-lg mb-6">
                Browse complete team rosters and discover all riders from your favorite cycling teams.
              </CardDescription>
              <Link href="/teams">
                <Button variant="outline" className="group">
                  Explore Teams
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Races Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Races</h2>
              <p className="text-xl text-gray-600">Explore the biggest races in professional cycling</p>
            </div>
            <Link href="/races">
              <Button variant="outline" className="group">
                View All Races
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRaces.map((race, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow border-0 shadow-md">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-green-500 relative">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`fi fi-${race.countryCode.toLowerCase()} w-6 h-4 rounded shadow-sm`}></span>
                      <span className="text-white font-semibold">{race.country}</span>
                    </div>
                    <h3 className="text-white text-xl font-bold">{race.name}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{race.description}</p>
                  <Link href={`/results/race?query=${encodeURIComponent(race.name)}`}>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                      View Results
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Teams Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Teams</h2>
              <p className="text-xl text-gray-600">Discover the world's best cycling teams</p>
            </div>
            <Link href="/teams">
              <Button variant="outline" className="group">
                View All Teams
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTeams.map((team, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`fi fi-${team.countryCode.toLowerCase()} w-8 h-6 rounded shadow-sm`}></span>
                    <CardTitle className="text-xl">{team.name}</CardTitle>
                  </div>
                  <CardDescription>{team.country}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Riders:</span>
                      <span className="font-semibold">{team.riders}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {team.achievements}
                    </div>
                  </div>
                  <Link href={`/teams/${team.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Button variant="outline" className="w-full">
                      View Roster
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Riders Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Star Riders</h2>
              <p className="text-xl text-gray-600">Follow the world's top cyclists on Strava</p>
            </div>
            <Link href="/riders">
              <Button variant="outline" className="group">
                View All Riders
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRiders.map((rider, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`fi fi-${rider.countryCode.toLowerCase()} w-8 h-6 rounded shadow-sm`}></span>
                    <CardTitle className="text-xl">{rider.name}</CardTitle>
                  </div>
                  <CardDescription>{rider.country}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="text-sm">
                      <span className="text-gray-600">Team: </span>
                      <span className="font-semibold">{rider.team}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {rider.achievements}
                    </div>
                  </div>
                  <Link href={`/riders/${rider.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                      View Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Explore Professional Cycling?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start discovering riders, races, and teams today. Find your favorite cyclists on Strava and follow their journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search/rider">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Search className="w-5 h-5 mr-2" />
                Search Riders
              </Button>
            </Link>
            <Link href="/races">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Trophy className="w-5 h-5 mr-2" />
                Browse Races
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
