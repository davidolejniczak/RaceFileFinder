package com.WT.RaceFileFinder.Rider;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@Repository
public interface RiderRepository extends JpaRepository<Rider, String>, PagingAndSortingRepository<Rider, String> {

    Optional<Rider> findByriderName(String riderName);

    Optional<Rider> findByRiderNameIgnoreCase(String riderName);

    @Query(value = "SELECT * FROM riders WHERE REPLACE(LOWER(unaccent(riderName)), ' ', '') = REPLACE(LOWER(unaccent(:riderName)),' '.'')", nativeQuery = true)
    Optional<Rider> searchByName(@Param("riderName") String riderName);

    @Query(value = "SELECT * FROM riders WHERE unaccent(riderName) ILike unaccent(CONCAT('%', :keyword, '%'))", nativeQuery = true)
    List<Rider> findByRiderNameContaining(String keyword);

    @Query(value = "SELECT * FROM riders WHERE REPLACE(LOWER(unaccent(team)),' ','') = LOWER(unaccent(:team))", nativeQuery = true)
    List<Rider> findByTeamIgnoreCase(@Param("team") String team);

    @Query(value = "SELECT * FROM riders WHERE REPLACE(LOWER(unaccent(nation)),' ','') = LOWER(unaccent(:nation))", nativeQuery = true)
    List<Rider> findByNation(@Param("nation") String nation);

    @Query(value = "SELECT * FROM riders WHERE REPLACE(LOWER(unaccent(team)),' ','') = LOWER(unaccent(:team)) AND LOWER(unaccent(nation)) = LOWER(unaccent(:nation))", nativeQuery = true)
    List<Rider> findByTeamAndNationIgnoreCase(String team, String nation);

    @Modifying
    @Query(value = "INSERT INTO riders (riderName, team, nation) VALUES(:riderName, :team, :nation)", nativeQuery = true)
    void saveRider(Rider rider);

}
