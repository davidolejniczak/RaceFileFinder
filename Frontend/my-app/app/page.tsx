"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
      <div className="flex flex-row gap-8 w-full h-full p-8 overflow-auto">
        <div className="flex-1 bg-white rounded-2xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Tour de France 2025</h1>
        
          <p className="text-gray-700 mb-4">
            Experience the grandeur of the 112th edition of the Tour de France. Follow every stage, every sprint, and every climb as the world's best cyclists compete for the coveted yellow jersey.
          </p>
          <Link 
            href="/races/tour-de-france-2025"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View Race Details
          </Link>
        </div>

      </div>
  );
}
