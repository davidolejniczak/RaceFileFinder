package com.WT.RaceFileFinder.Race;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface RaceRepository extends JpaRepository<Race, String>, PagingAndSortingRepository<Race, String> {

    @Query(value = "SELECT * FROM races WHERE unaccent(racename) ILike unaccent(CONCAT('%', :raceName, '%'))", nativeQuery = true)
    List<Race> findByRaceName(String raceName);

    @Query(value = "SELECT * FROM races WHERE unaccent(racename) ILike unaccent(CONCAT('%', :raceName, '%')) AND raceyear = :raceYear", nativeQuery = true)
    List<Race> findByRaceNameAndDate(String raceName, int raceYear);

    @Query(value = "SELECT * FROM race")
    List<Race> findByRace();
}
