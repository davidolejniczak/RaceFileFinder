package com.WT.RaceFileFinder.Race;

import jakarta.persistence.*;
import java.util.List;
import java.util.Optional;

public interface RaceRepository extends JpaRepository<Races, String>, PagingAndSortingRepository<Races, String> {

    @Query(value = "SELECT * FROM Races WHERE unaccent(raceName) ILike unaccent(CONCAT('%', :raceName, '%'))", nativeQuery = true)
    List<Race> findByRaceName(String raceName);

}
