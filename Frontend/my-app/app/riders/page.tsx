"use client";

import React from "react";
import Link from "next/link";

export default function RidersPage() {
  return (
      <div className="h-full p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">World Tour Riders</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Rider Cards */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Tadej Pogačar</h2>
            <p className="text-gray-600 mb-4">UAE Team Emirates - Multiple Grand Tour Winner</p>
            <Link href="/riders/tadej-pogacar" className="text-blue-600 hover:text-blue-800">
              View Profile →
            </Link>
          </div>
          {/* Add more rider cards as needed */}
        </div>
      </div>
  );
}
