"use client";

import React, { useState, useEffect } from "react";
import "./home.css";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Race {
  raceId: string;
  raceName: string;
  raceYear: string;
  raceLocation: string;
  raceLevel: string;
}

interface RaceResult {
  raceId: string;
  raceName: string;
  raceYear: string;
  riderPosition: string;
  riderName: string;
  riderStrava: string;
  riderteam: string;
}

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState<string | null>(null); 
  const [raceResults, setRaceResults] = useState<RaceResult[]>([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false); 

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const fetchSuggestions = async (query: string) => {
    setError(null); 
    if (!query) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/race/all?raceName=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Race[] = await response.json(); 
      setSuggestions(data.map(race => race.raceName));
      setShowSuggestions(data.length > 0);

    } catch (e) {
      setError("Failed to load suggestions."); 
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const triggerRaceSearch = async (raceNameInput: string) => { 

    setError(null);
    setRaceResults([]);
    setIsLoading(true);
    setSearchAttempted(true);
    setShowSuggestions(false);

    try {
      const response = await fetch(`http://localhost:8080/api/raceresults/r?racename=${encodeURIComponent(raceNameInput)}`);

      if (!response.ok) {
        let errorText = `HTTP error! status: ${response.status}`;
        throw new Error(errorText);
      }

      const backendRaceResults: RaceResult[] = await response.json();
      console.log("Received race results from backend:", backendRaceResults); 
      setRaceResults(backendRaceResults);

    } catch (e: any) {
      console.error("Failed to fetch race results:", e);
      setError(e.message || "Failed to fetch race results. Check console for details.");
      setRaceResults([]); 
    } finally {
      setIsLoading(false); 
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    debouncedFetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setSuggestions([]);
    setShowSuggestions(false); 
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      let searchTarget = inputValue;
      if (showSuggestions && suggestions.length > 0) {
        searchTarget = suggestions[0];
        setInputValue(searchTarget); 
        setShowSuggestions(false); 
        setSuggestions([]);
      }
      triggerRaceSearch(searchTarget);
    }
  };

  // Only include results with valid riderPosition to avoid null entries
  const validResults = raceResults.filter((r): r is RaceResult => r?.riderPosition != null && r?.riderName != null && r?.riderStrava != null);

  return (
    <div className="home-root">
      <div className="home-form-row">
        <label className="home-label" htmlFor="rider-strava">
          Enter WorldTour Race Name:
        </label>
        <div className="input-wrapper">
          <div className="autocomplete-container"> 
            <input
              id="rider-strava"
              type="text"
              placeholder="Race Name"
              className="home-input"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown} 
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)} 
              autoComplete="off" 
            />
            <button
              className="search-button"
              onClick={() => triggerRaceSearch(inputValue)}
              aria-label="Search"
              disabled={isLoading}
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onMouseDown={() => handleSuggestionClick(suggestion)} 
                    className="suggestion-item"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="error-message">
            {error ? error : "\u00A0"}
          </div>
        </div>
      </div>

{/* Race Results Table */}
<div className="results-table-container flex-[2] max-w-full mt-0 max-h-[calc(100vh-4rem)] overflow-y-auto rounded-lg border border-gray-500 shadow-sm">
  <Table className="table-auto w-full bg-gray-50">
    <TableHeader>
      <TableRow className="border-b border-gray-800 bg-gray-200">
        <TableHead className="border-r border-gray-300 whitespace-nowrap">Position</TableHead>
        <TableHead className="border-r border-gray-300 whitespace-nowrap">Rider Name</TableHead>
        <TableHead className="text-right whitespace-nowrap">Strava Link</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {!isLoading && validResults.length > 0 ? (
        validResults.map((result) => ( 
          <TableRow key={`${result.raceId}-${result.riderName}`}>
            <TableCell className="border-r border-gray-200 whitespace-nowrap">{result.riderPosition}</TableCell>
            <TableCell className="border-r border-gray-200 whitespace-nowrap">{result.riderName}</TableCell>
            <TableCell className="text-right whitespace-nowrap">
              <a
                href={result.riderStrava}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View on Strava
              </a>
            </TableCell>
          </TableRow>
        ))
      ) : isLoading ? (
        <TableRow>
          <TableCell colSpan={3} className="text-center h-24">
            Loading...
          </TableCell>
        </TableRow>
      ) : searchAttempted ? (
        <TableRow>
          <TableCell colSpan={3} className="text-center h-24">
            No results found.
          </TableCell>
        </TableRow>
      ) : null}
    </TableBody>
  </Table>
</div>
    </div>
  );
}
