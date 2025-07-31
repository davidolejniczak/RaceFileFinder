"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RaceSearch() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://cyclingfilefinder-25df5d1a64a0.herokuapp.com/api/rider/name?riderName=${encodeURIComponent(
          searchQuery
        )}`
      );

      if (response.status === 404) {
        setError(`Rider ${searchQuery} not found or does not have a Strava account.`);
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.riderStravaLink) {
        window.open(data.riderStravaLink, "_blank");
      } else {
        setError(`Rider "${searchQuery}" does not have a Strava account.`);
      }
    } catch (e: any) {
      setError(e.message || "An error occurred during the search.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      setInputValue(query);
      handleSearch(query);
    }
  }, [searchParams, handleSearch]);

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
        `https://cyclingfilefinder-25df5d1a64a0.herokuapp.com/api/rider/all?q=${encodeURIComponent(
          query
        )}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: string[] = await response.json();
      setSuggestions(data);
      setShowSuggestions(data.length > 0);
    } catch (e) {
      setError("Failed to load suggestions.");
      setSuggestions([]);
      setShowSuggestions(false);
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
    handleSearch(suggestion);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      let searchTarget = inputValue;
      if (showSuggestions && suggestions.length > 0) {
        searchTarget = suggestions[0];
        setInputValue(searchTarget);
        setShowSuggestions(false);
        setSuggestions([]);
      }
      handleSearch(searchTarget);
    }
  };

  return (
    <div className="home-form-row">
      <label className="home-label" htmlFor="rider-strava">
        Enter Rider Name:
      </label>
      <div className="input-wrapper">
        <div className="autocomplete-container">
          <input
            id="rider-strava"
            type="text"
            placeholder="e.g., Tadej Pogačar"
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
        <div className="error-message">{error ? error : " "}</div>
      </div>
    </div>
  );
}