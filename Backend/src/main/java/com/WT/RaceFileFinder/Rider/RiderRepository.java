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
@RepositoryRestResource(collectionResourceRel = "team", path = "team")
public interface RiderRepository extends JpaRepository<Rider, String>, PagingAndSortingRepository<Rider, String> {

    // List<Rider> findByTeam(String team);

    Rider findByRiderName(String riderName);

    List<Rider> findByTeam(@Param("team") String name);
}
