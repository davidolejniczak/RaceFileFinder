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

export default function RootLayorut({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="home-root">
          <div className="header-bar w-full flex justify-start">
            <MainNav />
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
