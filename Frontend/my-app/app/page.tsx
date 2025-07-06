"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Search from "./search";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

export default function Home() {
  return (
    <div className="home-root">
      <div className="header-bar">
              <NavigationMenu className="relative justify-center w-full">
                <NavigationMenuList className="justify-center space-x-2">
                  {/* Same navigation menu as other pages */}
                </NavigationMenuList>
                <NavigationMenuViewport className="origin-top-center absolute top-full left-0 mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]" />
              </NavigationMenu>
            </div>
      <div className="flex flex-row gap-8 w-full p-8">
        <div className="flex-1 bg-white rounded-2xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Tour de France 2025</h1>
          <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
            <Image
              src="/tdf-2025.jpg"
              alt="Tour de France 2025"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
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
        
        <div className="w-[400px]">
          <Search />
        </div>
      </div>
    </div>
  );
}
