import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export default function MainNav() {
  return (
    <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-gray-50 to-white shadow-lg border-b border-gray-200/70">
      <div className="container justify-start pl-4">
        <NavigationMenu className="w-full justify-start">
          <NavigationMenuList className="flex items-center justify-start h-16 space-x-2">
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-700 rounded-lg transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                <span className="font-semibold">Home</span>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="/riders"
                className="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-700 rounded-lg transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                <span className="font-semibold">Riders</span>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="/teams"
                className="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-700 rounded-lg transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                <span className="font-semibold">Teams</span>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="/races"
                className="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-700 rounded-lg transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                <span className="font-semibold">Races</span>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="/search"
                className="inline-flex items-center px-6 py-3 text-sm font-medium bg-gray-100 text-gray-800 rounded-lg transition-all duration-200 hover:bg-gray-200 hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:ring-offset-2 focus:ring-offset-gray-50 border border-gray-200"
              >
                <span className="font-semibold">Search</span>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
