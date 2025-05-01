package com.WT.RaceFileFinder.Rider;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Service
public class RiderService {

    private final RiderRepository riderRepository;

    public RiderService(RiderRepository riderRepository) {
        this.riderRepository = riderRepository;
    }

    public List<Rider> getAllRiders(Sort sort) {
        return riderRepository.findAllRiders(sort);
    }

    public Rider getRiderByName(String riderName) {
        Optional<Rider> foundRider = riderRepository.findByRiderName(riderName);
        if (foundRider.isPresent())
            return foundRider.get();

        foundRider = riderRepository.findByRiderNameIgnoreCase(riderName);
        if (foundRider.isPresent())
            return foundRider.get();

        foundRider = riderRepository.searchByName(riderName);
        if (foundRider.isPresent())
            return foundRider.get();

        throw new RiderNotFoundException("Rider not found");
    }

    public Rider getByTeam(String team) {
        return riderRepository.findByTeam(team);
    }

    public List<Rider> getByNameContaining(String keyword) {
        return riderRepository.findByNameContaining(keyword);
    }

    public List<Rider> getByNationality(String nationality) {
        return riderRepository.findByNationality(nationality);
    }

    public List<Rider> getByTeamAndNationality(String team, String nationality) {
        return riderRepository.findByTeamAndNationality(team, nationality);
    }

    public Rider saveRider(String riderName, String team, String nationality) {
        return riderRepository.saveRider(riderName, team, nationality);
    }

}
