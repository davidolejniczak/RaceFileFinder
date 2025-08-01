"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Team {
  teamID: string;
  teamName: string;
}

export default function RaceSearch() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
      const response = await fetch(
        `https://cyclingfilefinder-25df5d1a64a0.herokuapp.com/api/teams/search?teamName=${encodeURIComponent(
          query
        )}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Team[] = await response.json();
      setSuggestions(data.map((team) => team.teamName)); 
      setShowSuggestions(data.length > 0);
    } catch (e) {
      setError("Failed to load suggestions.");
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = async (searchQuery: string) => {
    setIsLoading(true);
    setError(null); 
    
    try {
      const response = await fetch(
        `https://cyclingfilefinder-25df5d1a64a0.herokuapp.com/api/teams/search?teamName=${encodeURIComponent(searchQuery)}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: Team[] = await response.json();
      
      if (data.length > 0) {
        const team = data[0];
        
        if (team.teamID) {
          router.push(`/teams/${team.teamID}`);
        } else {
          const teamData = team as any;
          const teamId = teamData.teamID;
          
          if (teamId) {
            router.push(`/teams/${teamId}`);
          } else {
            setError("Team ID not found in response.");
          }
        }
      } else {
        setError("No team found with that name.");
      }
    } catch (e) {
      setError("Failed to find team.");
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

  const handleSuggestionClick = async (suggestion: string) => {
    setInputValue(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
    await handleSearch(suggestion);
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      let searchTarget = inputValue;
      if (showSuggestions && suggestions.length > 0) {
        searchTarget = suggestions[0];
        setInputValue(searchTarget);
        setShowSuggestions(false);
        setSuggestions([]);
      }
      await handleSearch(searchTarget);
    }
  };

  return (
    <div className="home-form-row">
      <label className="home-label" htmlFor="rider-strava">
        Enter Team Name:
      </label>
      <div className="input-wrapper">
        <div className="autocomplete-container">
          <input
            id="rider-strava"
            type="text"
            placeholder="e.g., INEOS"
            className="home-input"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            autoComplete="off"
          />
          <button
            className="search-button"
            onClick={() => handleSearch(inputValue)}
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
        <div className="error-message">{error ? error : "\u00A0"}</div>
      </div>
    </div>
  );
}