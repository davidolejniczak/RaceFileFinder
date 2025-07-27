package com.WT.RaceFileFinder.Rider;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

@Repository
public interface RiderRepository extends JpaRepository<Rider, String> {

    Optional<Rider> findByriderName(String riderName);

    Optional<Rider> findByRiderNameIgnoreCase(String riderName);

    @Query(value = "SELECT * FROM riders WHERE REPLACE(LOWER(unaccent(riderName)), ' ', '') = REPLACE(LOWER(unaccent(:riderName)),' '.'')", nativeQuery = true)
    Optional<Rider> searchByName(@Param("riderName") String riderName);

    @Query(value = "SELECT * FROM riders WHERE unaccent(riderName) ILike unaccent(CONCAT('%', :keyword, '%'))", nativeQuery = true)
    List<Rider> findByRiderNameContaining(String keyword);

    @Query(value = "SELECT * FROM riders WHERE REPLACE(LOWER(unaccent(team)),' ','') = LOWER(unaccent(:riderTeam))", nativeQuery = true)
    List<Rider> findByTeamIgnoreCase(@Param("riderTeam") String riderTeam);

    @Query(value = "SELECT * FROM riders WHERE REPLACE(LOWER(unaccent(nation)),' ','') = LOWER(unaccent(:riderCountry))", nativeQuery = true)
    List<Rider> findByNation(@Param("riderCountry") String riderCountry);

    @Query(value = "SELECT * FROM riders WHERE REPLACE(LOWER(unaccent(team)),' ','') = LOWER(unaccent(:riderTeam)) AND LOWER(unaccent(nation)) = LOWER(unaccent(:riderCountry))", nativeQuery = true)
    List<Rider> findByTeamAndNationIgnoreCase(String team, String nation);

    // @Modifying
    // @Query(value = "INSERT INTO riders (riderName, team, nation)
    // VALUES(:riderName, :riderTeam, :riderCountry)", nativeQuery = true)
    // void saveRider(@Param("riderName") String riderName, @Param("riderTeam")
    // String riderTeam,
    // @Param("riderCountry") String riderCountry);

    @Query(value = "SELECT * FROM riders WHERE riderId = :riderId", nativeQuery = true)
    Rider findByRiderId(@Param("riderId") String riderId);

    @Query(value = "SELECT * FROM riders WHERE teamId = :teamId", nativeQuery = true)
    List<Rider> findByTeamId(@Param("teamId") String teamId);

    @Query(value = "SELECT * FROM riders WHERE riderpopular = true", nativeQuery = true)
    List<Rider> findPopularRiders();

}
