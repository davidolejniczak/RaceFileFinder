package com.WT.RaceFileFinder.Rider;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import java.util.List;
import java.util.Optional;

@Service
public class RiderService {

    private final RiderRepository riderRepository;

    public RiderService(RiderRepository riderRepository) {
        this.riderRepository = riderRepository;
    }

    public List<Rider> getAllRiders() {
        Sort sort = Sort.by(Sort.Order.asc("riderName"));
        return riderRepository.findAll(sort);
    }

    public Rider getRiderByName(String riderName) {
        Optional<Rider> foundRider = riderRepository.findByriderName(riderName);
        if (foundRider.isPresent())
            return foundRider.get();

        foundRider = riderRepository.findByRiderNameIgnoreCase(riderName);
        if (foundRider.isPresent())
            return foundRider.get();

        foundRider = riderRepository.searchByName(riderName);
        return foundRider.get();

    }

    public List<Rider> getByTeam(String team) {
        return riderRepository.findByTeam(team);
    }

    public List<Rider> getByNameContaining(String keyword) {
        return riderRepository.findByRiderNameContaining(keyword);
    }

    public List<Rider> getByNationality(String nationality) {
        return riderRepository.findByNationality(nationality);
    }

    public List<Rider> getByTeamAndNationality(String team, String nationality) {
        return riderRepository.findByTeamAndNationality(team, nationality);
    }

    @Transactional
    public void saveRider(Rider rider) {
        String riderName = rider.getRiderName();
        String team = rider.getTeam();
        String nationality = rider.getNationality();
        riderRepository.saveRider(rider);
    }

}
