package com.WT.RaceFileFinder.Rider;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
import java.util.Optional;

@Repository
public interface RiderRepository extends JpaRepository<Rider, String>, PagingAndSortingRepository<Rider, String> {

    List<Rider> findAllRiders(Sort sort);

    Optional<Rider> findByRiderName(String riderName);

    Optional<Rider> findByRiderNameIgnoreCase(String riderName);

    @Query(value = "SELECT * FROM riders WHERE unaccent(riderName) ILIKE unaccent(:name)", nativeQuery = true)
    Optional<Rider> searchByName(@Param("name") String riderName);

    List<Rider> findByNameContaining(String keyword);

    List<Rider> findByTeam(String team);

    List<Rider> findByNationality(String nationality);

    List<Rider> findByTeamAndNationality(String team, String nationality);

    Rider saveRider(String riderName, String team, String nationality);

}
