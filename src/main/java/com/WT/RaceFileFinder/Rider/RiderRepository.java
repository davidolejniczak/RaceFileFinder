package com.WT.RaceFileFinder.Rider;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RiderRepository extends JpaRepository<Rider, String> {

    List<Rider> findByTeam(String team);

    Rider findByRiderName(String riderName);
}
