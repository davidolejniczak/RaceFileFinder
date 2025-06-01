package com.WT.RaceFileFinder.RaceResults;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface RaceResultsRepository
        extends JpaRepository<RaceResults, RaceResultsId>, PagingAndSortingRepository<RaceResults, RaceResultsId> {

    @Query(value = """SELECT * FROM raceresults WHERE unaccent(racename) ILIKE unaccent(:raceName) ORDER BY CASE WHEN position ~ '^[0-9]+$' THEN CAST(position AS INTEGER) ELSE NULL END ASC NULLS LAST, position ASC""",nativeQuery = true)
    List<RaceResults> findByRaceName(String raceName);

}
