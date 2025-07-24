package com.WT.RaceFileFinder.Race;

import org.springframework.data.jpa.repository.*;

import java.util.List;

public interface RaceRepository extends JpaRepository<Race, String> {

    @Query(value = "SELECT * FROM races WHERE unaccent(racename) ILike unaccent(CONCAT('%', :raceName, '%'))", nativeQuery = true)
    List<Race> findByRaceName(String raceName);

    @Query(value = "SELECT * FROM races WHERE unaccent(racename) ILike unaccent(CONCAT('%', :raceName, '%')) AND raceyear = :raceYear", nativeQuery = true)
    List<Race> findByRaceNameAndDate(String raceName, int raceYear);

    @Query(value = "SELECT * FROM races", nativeQuery = true)
    List<Race> findByRace();

    @Query(value = "SELECT * FROM races", nativeQuery = true)
    List<Race> findAllRaces();
}
