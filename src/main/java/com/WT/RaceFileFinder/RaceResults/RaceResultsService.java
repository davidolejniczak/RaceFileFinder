package com.WT.RaceFile.Race_results;

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

    public List<RaceResults> getRaceResults(String raceName, String raceYear) {
        return raceResultsRepository.findByRaceNameANDRaceYear(raceName, raceYear);
    }

}
