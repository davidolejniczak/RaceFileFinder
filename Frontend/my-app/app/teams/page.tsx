"use client";

import React from "react";
import Link from "next/link";

export default function TeamsPage() {
  return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">World Tour Teams</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Team Cards */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-2">UAE Team Emirates</h2>
            <p className="text-gray-600 mb-4">Home team of multiple Grand Tour winner Tadej Pogačar.</p>
            <Link href="/teams/uae-team-emirates" className="text-blue-600 hover:text-blue-800">
              View Team →
            </Link>
          </div>
          {/* Add more team cards as needed */}
        </div>
      </div>
  );
}
