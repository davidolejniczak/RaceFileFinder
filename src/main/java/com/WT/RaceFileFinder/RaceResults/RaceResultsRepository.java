package com.WT.RaceFileFinder.RaceResults;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface RaceResultsRepository
        extends JpaRepository<RaceResults, String>, PagingAndSortingRepository<RaceResults, String> {

    @Query(value = "SELECT * FROM raceresults WHERE REPLACE(LOWER(unaccent(racename)),' ','') = REPLACE(LOWER(unaccent(:raceName)),' ','')", nativeQuery = true)
    List<RaceResults> findByRaceName(String raceName);

}
