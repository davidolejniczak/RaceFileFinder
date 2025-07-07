"use client";

import React, { useState, useEffect, Suspense, use } from "react";
import { useSearchParams } from "next/navigation";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import Link from "next/link";

type SearchType = "rider" | "team" | "race";

interface RiderResult {
  riderName: string;
  teamName: string;
  stravaLink: string;
}

interface TeamResult {
  teamName: string;
  teamUrl: string;
}

interface RaceResult {
  raceName: string;
  riderPosition: string;
  riderName: string;
  riderStrava: string;
}

const apiConfig = {
  rider: {
    endpoint: "https://cyclingfilefinder-25df5d1a64a0.herokuapp.com/api/rider/all?riderName=",
  },
  team: {
    endpoint: "https://cyclingfilefinder-25df5d1a64a0.herokuapp.com/api/team/all?teamName=",
  },
  race: {
    endpoint: "https://cyclingfilefinder-25df5d1a64a0.herokuapp.com/api/race/all?raceName=",
  },
};

function ResultsPageContent({ params }: { params: Promise<{ searchType: string }> }) {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const { searchType } = use(params);

  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query && searchType && searchType in apiConfig) {
      const fetchResults = async () => {
        setIsLoading(true);
        setError(null);
        setResults([]);
        try {
          const config = apiConfig[searchType as SearchType];
          const response = await fetch(`${config.endpoint}${encodeURIComponent(query)}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setResults(Array.isArray(data) ? data : []);
        } catch (e: any) {
          setError(e.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchResults();
    }
  }, [query, searchType]);

  const renderResults = () => {
    if (isLoading) {
      return <TableRow><TableCell colSpan={3} className="no-results-cell text-center h-24">Loading...</TableCell></TableRow>;
    }
    if (error) {
      return <TableRow><TableCell colSpan={3} className="no-results-cell text-center h-24">Error: {error}</TableCell></TableRow>;
    }
    if (results.length === 0) {
      return <TableRow><TableCell colSpan={3} className="no-results-cell text-center h-24">No results found for "{query}"</TableCell></TableRow>;
    }

    switch (searchType as SearchType) {
      case 'rider':
        return <RiderResults data={results as RiderResult[]} />;
      case 'team':
        return <TeamResults data={results as TeamResult[]} />;
      case 'race':
        return <RaceResults data={results as RaceResult[]} />;
      default:
        return <TableRow><TableCell colSpan={3} className="no-results-cell text-center h-24">Invalid search type.</TableCell></TableRow>;
    }
  };

  const renderHeaders = () => {
    switch (searchType as SearchType) {
      case 'rider':
        return <><TableHead>Rider Name</TableHead><TableHead>Team</TableHead><TableHead>Strava Link</TableHead></>;
      case 'team':
        return <><TableHead>Team Name</TableHead><TableHead>Website</TableHead></>;
      case 'race':
        return <><TableHead>Position</TableHead><TableHead>Rider Name</TableHead><TableHead>Strava Link</TableHead></>;
      default:
        return <TableHead>Results</TableHead>;
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Search Results for: <span className="text-blue-600">{query}</span></h1>
      <div className="results-table-container">
        <Table>
          <TableHeader><TableRow>{renderHeaders()}</TableRow></TableHeader>
          <TableBody>{renderResults()}</TableBody>
        </Table>
      </div>
    </div>
  );
}

const RiderResults = ({ data }: { data: RiderResult[] }) => (
  <>
    {data.map((result, index) => (
      <TableRow key={index}>
        <TableCell>{result.riderName}</TableCell>
        <TableCell>{result.teamName}</TableCell>
        <TableCell>
          <a href={result.stravaLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">View Strava</a>
        </TableCell>
      </TableRow>
    ))}
  </>
);

const TeamResults = ({ data }: { data: TeamResult[] }) => (
  <>
    {data.map((result, index) => (
      <TableRow key={index}>
        <TableCell>{result.teamName}</TableCell>
        <TableCell>
          <a href={result.teamUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Visit Website</a>
        </TableCell>
      </TableRow>
    ))}
  </>
);

const RaceResults = ({ data }: { data: RaceResult[] }) => (
  <>
    {data.map((result, index) => (
      <TableRow key={index}>
        <TableCell>{result.riderPosition}</TableCell>
        <TableCell>{result.riderName}</TableCell>
        <TableCell>
          {result.riderStrava && (
            <a href={result.riderStrava} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">View Activity</a>
          )}
        </TableCell>
      </TableRow>
    ))}
  </>
);

export default function ResultsPage({ params }: { params: Promise<{ searchType: string }> }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsPageContent params={params} />
    </Suspense>
  );
}
