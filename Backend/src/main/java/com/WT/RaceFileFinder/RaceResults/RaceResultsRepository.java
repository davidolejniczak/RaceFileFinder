package com.WT.RaceFileFinder.RaceResults;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface RaceResultsRepository
        extends JpaRepository<RaceResults, String>, PagingAndSortingRepository<RaceResults, String> {

    @Query(value = "SELECT * FROM raceresults WHERE unaccent(racename) ILIKE unaccent(:raceName)", nativeQuery = true)
    List<RaceResults> findByRaceName(String raceName);

}
