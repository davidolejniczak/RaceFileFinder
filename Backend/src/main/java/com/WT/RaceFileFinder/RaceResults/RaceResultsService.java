package com.WT.RaceFileFinder.RaceResults;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RaceResultsService {

    private final RaceResultsRepository raceResultsRepository;

    public RaceResultsService(RaceResultsRepository raceResultsRepository) {
        this.raceResultsRepository = raceResultsRepository;
    }

    public List<RaceResults> getRaceResults(String racename) {
        System.out.println("SERVICE: Processing race name: '" + racename + "'");
        System.out.println("SERVICE: Calling repository.findByRaceName() with parameter: " + racename);

        List<RaceResults> results = raceResultsRepository.findByRaceName(racename);

        System.out.println("SERVICE: Repository returned " + results.size() + " results");

        // Print details of each result
        if (results.size() > 0) {
            System.out.println("SERVICE: Details of results:");
            for (int i = 0; i < results.size(); i++) {
                RaceResults result = results.get(i);
                System.out.println("  Result " + (i + 1) + " - Race: '" + result.getRaceName() +
                        "', Position: '" + result.getRiderPosition() +
                        "', Rider: '" + result.getRiderName() +
                        "', Strava: '" + result.getRiderStrava() + "'");
            }
        } else {
            System.out.println("SERVICE: No results found for race name: " + racename);
        }

        System.out.println("SERVICE: Returning " + results.size() + " results to controller");
        return results;
    }

    public List<RaceResults> getRaceResultsByTeamId(String teamId) {
        return raceResultsRepository.findByTeamId(teamId);
    }

}
