package com.WT.RaceFileFinder.Team;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, String> {

    Optional<Team> findByTeamName(String teamName);

    Optional<Team> findByTeamNameIgnoreCase(String teamName);

    @Query(value = "SELECT * FROM teams WHERE REPLACE(LOWER(unaccent(teamName)), ' ', '') = REPLACE(LOWER(unaccent(:teamName)),' ','')", nativeQuery = true)
    Optional<Team> searchByName(@Param("teamName") String teamName);

    @Query(value = "SELECT * FROM teams WHERE unaccent(teamName) ILike unaccent(CONCAT('%', :keyword, '%'))", nativeQuery = true)
    List<Team> findByTeamNameContaining(String keyword);

    @Query(value = "SELECT teamid, teamname, country, countrycode, teamurl FROM teams WHERE teamid = :teamid", nativeQuery = true)
    Team findByTeamId(@Param("teamid") String teamId);
}
