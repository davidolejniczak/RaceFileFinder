package com.WT.RaceFileFinder.RaceResults;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface RaceResultsRepository
        extends JpaRepository<RaceResults, RaceResultsId>, PagingAndSortingRepository<RaceResults, RaceResultsId> {

    @Query(value = "SELECT * FROM raceresults WHERE unaccent(racename) ILIKE unaccent(:raceName) ORDER BY CAST(riderposition AS INTEGER) ASC", nativeQuery = true)
    List<RaceResults> findByRaceName(String raceName);

}
