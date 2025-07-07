import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import MainNav from "@/components/main-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pro Cyclist Strava Finder",
  description: "Find Pro Cyclist (TDF) Strava Profiles and Accounts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen overflow-hidden`}
      >
        <div className="home-root h-full flex flex-col">
          <div className="header-bar w-full flex justify-start flex-shrink-0">
            <MainNav />
          </div>
          <div className="flex-1 min-h-0 overflow-hidden">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
