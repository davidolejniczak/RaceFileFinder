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
        List<RaceResults> results = raceResultsRepository.findByRaceName(racename);
        return results;
    }

}
