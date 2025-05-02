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

    @Query(value = "SELECT * FROM riders WHERE REPLACE(LOWER(unaccent(riderName)), ' ', '') = LOWER(unaccent(:riderName))", nativeQuery = true)
    Optional<Rider> searchByName(@Param("riderName") String riderName);

    List<Rider> findByRiderNameContaining(String keyword);

    List<Rider> findByTeamIgnoreCase(String team);

    List<Rider> findByNationalityIgnoreCase(String nationality);

    List<Rider> findByTeamAndNationalityIgnoreCase(String team, String nationality);

    @Modifying
    @Query(value = "INSERT INTO riders (riderName, team, nationality) VALUES (:riderName, :team, :nationality)", nativeQuery = true)
    void saveRider(Rider rider);

}
