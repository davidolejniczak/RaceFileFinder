package com.WT.RaceFileFinder.RaceResults;

import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Sort;
import java.util.List;

@Service
public class RaceResultsService {

    private final RaceResultsRepository raceResultsRepository;

    public RaceResultsService(RaceResultsRepository raceResultsRepository) {
        this.raceResultsRepository = raceResultsRepository;
    }

    public List<RaceResults> getRaceResults(String racename) {
        System.out.println("Service: Searching for race name: " + racename);
        List<RaceResults> results = raceResultsRepository.findByRaceName(racename);
        System.out.println("Service: Found " + results.size() + " results");
        results.removeIf(result -> result == null);
        for (RaceResults result : results) {
            System.out.println("Service: Result - RaceName: " + result.getRaceName() +
                    ", RiderName: " + result.getRiderName() +
                    ", Position: " + result.getRiderPosition() +
                    ", Strava: " + result.getRiderStrava());
        }
        return results;
    }

}
