package com.WT.RaceFileFinder.Race;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RaceService {

    private final RaceRepository raceRepository;

    public RaceService(RaceRepository raceRepository) {
        this.raceRepository = raceRepository;
    }

    public List<Race> getRaceName(String raceName) {
        return raceRepository.findByRaceName(raceName);
    }

    public List<Race> getRaceNameDate(String raceName, int raceYear) {
        return raceRepository.findByRaceNameAndDate(raceName, raceYear);
    }

    public List<Race> getRaces() {
        return raceRepository.findByRace();
    }

    public List<Race> getAllRaces() {
        return raceRepository.findAllRaces();
    }
}
