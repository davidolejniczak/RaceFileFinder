package com.WT.RaceFileFinder.Rider;

// import jakarta.transaction.Transactional;
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
        List<Rider> riders = riderRepository.findAll(sort);
        System.out.println(
                "[DEBUG] Service - Retrieved riders from repository: " + (riders != null ? riders.size() : "null"));
        return riders;
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

    public List<Rider> getByTeam(String riderTeam) {
        return riderRepository.findByTeamIgnoreCase(riderTeam);
    }

    public List<Rider> getByNameContaining(String keyword) {
        return riderRepository.findByRiderNameContaining(keyword);
    }

    public List<Rider> getByNation(String riderCountry) {
        return riderRepository.findByNation(riderCountry);
    }

    public List<Rider> getByTeamAndNation(String riderTeam, String riderCountry) {
        return riderRepository.findByTeamAndNationIgnoreCase(riderTeam, riderCountry);
    }

    // @Transactional
    // public void saveRider(Rider rider) {
    // riderRepository.saveRider(rider);
    // }

    public Rider getRiderById(String riderID) {
        return riderRepository.findByRiderId(riderID);
    }

    public List<Rider> getRidersByTeamId(String teamId) {
        return riderRepository.findByTeamId(teamId);
    }

    public List<Rider> getPopularRiders() {
        List<Rider> riders = riderRepository.findPopularRiders();
        System.out.println(
                "[DEBUG] Service - Retrieved riders from repository: " + (riders != null ? riders.size() : "null"));
        return riderRepository.findPopularRiders();
    }

}
