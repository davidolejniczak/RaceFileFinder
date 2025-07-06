"use client";

import React from "react";
import Link from "next/link";

export default function RacesPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">World Tour Races</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Race Cards */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Tour de France</h2>
          <p className="text-gray-600 mb-4">
            The most prestigious Grand Tour in professional cycling.
          </p>
          <Link
            href="/races/tour-de-france"
            className="text-blue-600 hover:text-blue-800"
          >
            View Details →
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Giro d'Italia</h2>
          <p className="text-gray-600 mb-4">
            The first Grand Tour of the season, known for its challenging mountain
            stages.
          </p>
          <Link
            href="/races/giro-d-italia"
            className="text-blue-600 hover:text-blue-800"
          >
            View Details →
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-2">La Vuelta</h2>
          <p className="text-gray-600 mb-4">
            The final Grand Tour of the season, featuring steep climbs and
            exciting finishes.
          </p>
          <Link
            href="/races/vuelta-a-espana"
            className="text-blue-600 hover:text-blue-800"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
