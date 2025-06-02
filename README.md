# Strava Pro Cyclist Race File Finder

Live Demo: https://cyclingfilefinder.vercel.app/  
Backend API: https://cyclingfilefinder-25df5d1a64a0.herokuapp.com/  

## Example 
- Type in `Milano-Sanermo` in the searh box and press Enter
- The resutls table will appear with the results from the race 
- Riders' strava account, if available, will appear as well

## Project Overview
A full-stack application enabling cyclists to quickly fetch Strava activity URLs for riders in any UCI Men'sWorldTour race from this season (2025)  
- **Frontend:** React (Next.js), TypeScript, TailwindCSS  
- **Backend:** Spring Boot, Java, PostgreSQL  
- **Hosting:** Vercel (frontend), Heroku (backend), Heroku Postgres  

## Key Features
- **Autocomplete Search**  
  Instant suggestions as you type any race name (case- and accent-insensitive).
- **Race Results Table**  
  Displays finishing positions, rider names, and direct Strava links.
- **Error Handling & UX**  
  Graceful loading states, no-results feedback, and inline error messages.
- **Responsive Design**  
  Mobile-friendly layout with fixed header and scrollable results.

## How It Works
1. User types a race name → frontend calls `/api/race/all` → Spring Boot queries `races` table via `ILIKE unaccent(...)`.  
2. On selection or Enter → frontend calls `/api/raceresults/r` → returns JSON array of `{raceName, riderPosition, riderName, riderStrava}`.  
3. React renders results in a styled table. Missing Strava links show “No link available.”

## Future Improvements
- **Race Results links updating** Allow users to update Strava links for a rider 
- **New Features** for large result sets and to have various search criteria 
- **Authentication** for saving favorit races and riders
- **Server-side rendering** for SEO on landing pages



