package com.WT.RaceFileFinder.RaceResults;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface RaceResultsRepository
        extends JpaRepository<RaceResults, RaceResultsId>, PagingAndSortingRepository<RaceResults, RaceResultsId> {

    @Query(value = "SELECT raceresults.racename, raceresults.riderposition, raceresults.ridername, riders.strava AS riderstrava FROM raceresults JOIN riders ON LOWER(raceresults.ridername) = LOWER(riders.ridername)  WHERE unaccent(raceresults.racename) ILIKE unaccent(:raceName) ORDER BY CAST(raceresults.riderposition AS INTEGER) ASC", nativeQuery = true)
    List<RaceResults> findByRaceName(String raceName);

    @Query(value = "SELECT raceresults.racename, raceresults.riderposition, raceresults.ridername, raceresults.riderCountryCode, raceresults.raceDate FROM raceresults JOIN riders ON LOWER(raceresults.ridername) = LOWER(riders.ridername) WHERE riders.teamId = (:teamId) ORDER BY CAST(raceresults.riderposition AS INTEGER) ASC", nativeQuery = true)
    List<RaceResults> findByTeamId(String teamId);
}
