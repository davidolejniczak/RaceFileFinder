package com.WT.RaceFileFinder.RaceResults;

import org.springframework.data.jpa.repository.*;

import java.util.List;

public interface RaceResultsRepository
        extends JpaRepository<RaceResults, RaceResultsId> {

    @Query(value = "SELECT raceresults.racename, raceresults.riderposition, raceresults.ridername, riders.riderstravalink FROM raceresults JOIN riders ON LOWER(raceresults.ridername) = LOWER(riders.ridername)  WHERE unaccent(raceresults.racename) ILIKE unaccent(:racename) ORDER BY CAST(raceresults.riderposition AS INTEGER) ASC", nativeQuery = true)
    List<RaceResults> findByRaceName(String racename);

    @Query(value = "SELECT raceresults.racename, raceresults.riderposition, raceresults.ridername, raceresults.countrycode, raceresults.racedate FROM raceresults JOIN riders ON LOWER(raceresults.ridername) = LOWER(riders.ridername) WHERE riders.teamid = (:teamId) ORDER BY CAST(raceresults.riderposition AS INTEGER) ASC", nativeQuery = true)
    List<RaceResults> findByTeamId(String teamId);

    @Query(value = "SELECT raceresults.racename, raceresults.riderposition, raceresults.ridername, riders.riderstravalink FROM raceresults JOIN riders ON LOWER(raceresults.ridername) = LOWER(riders.ridername)  WHERE unaccent(raceresults.racename) ILIKE unaccent(:racename) ORDER BY CAST(raceresults.riderposition AS INTEGER) ASC", nativeQuery = true)
    List<Object[]> findByRaceNameRaw(String racename);

    @Query(value = "SELECT * FROM raceresults WHERE LOWER(riderteam) = LOWER(:teamName) ORDER BY CAST(riderposition AS INTEGER) ASC", nativeQuery = true)
    List<RaceResults> findByTeamName(String teamName);
}
