# Pro Cyclist Strava Finder

Live Demo: https://cyclingfilefinder.vercel.app/

## Project Overview
A full stack application allowing users to explore WorldTour rider, team, and race information and locate corresponding Strava profiles. 

## Features
- Search for the Strava profile of any Men World rider
- Race results for all Men's World Tour Races up to Data Cut-off date with easy access to Rider's strava profils 
- Team directory with deep links to team detail pages including team websites and best race results
- Team detail view: team info, riders roster, race results tables
- Clean home page displaying the most popular races, teams, and riders

## Tech Stack
- **Frontend:** Next.js, React, TypeScript, TailwindCSS, Shadcn UI Components, flag-icons
- **Backend:** Spring Boot, Spring Data JPA, PostgreSQL
- **Build / Tooling:** Maven, TypeScript, ESLint
- **Hosting:** Vercel (frontend), Heroku (backend + Heroku Postgres)

## Data Cut-Off
Race / rider results currently loaded through: June 1st 

## Architecture
Monorepo style layout:

```
Backend/Backend   -> Spring Boot service (API + data layer)
Frontend/my-app   -> Next.js app
```

Key flow:
1. User navigates UI pages (home, riders, teams, races, search) in the Next.js app.
2. Client components fetch JSON from the Spring Boot API under `/api/...`.
3. Spring controllers use to return entity data.


## Running the Application
You need a PostgreSQL database created first and adjust the Backend code to load it in. 

### Start Backend
```
cd Backend
./mvnw spring-boot:run
```
API default: http://localhost:8080

### Start Frontend
```
cd Frontend/my-app
npm run dev
```
Frontend: http://localhost:3000


## Acknowledgements
- Various cycling sites to collect data for the UCI Men's WorldTour