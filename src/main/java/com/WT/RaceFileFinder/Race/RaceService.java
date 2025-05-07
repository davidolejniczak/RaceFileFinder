package com.WT.RaceFileFinder.Race;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import java.util.List;
import java.util.Optional;

@Service
public class RaceService {

    private final RaceRepository raceRepository;

    public RaceService(RaceRepository raceRepository) {
        this.raceRepository = raceRepository;
    }

    public List<Race> getRaceName(String raceName) {
        return raceRepository.findByRaceName(raceName);
    }

    public List<Race> getRaceNameDate(String raceName, int raceDate) {
        return raceRepository.findByRaceNameAndDate(raceName, raceDate);
    }
}
