package com.WT.RaceFileFinder.Race;

import java.util.Collections;
import java.util.List;

@Service
public class RaceService {

    private final RaceRepository raceRepository;

    public raceService(RaceRepository raceRepository){
        this.raceRepository = raceRepository; 
    }

    public List<Race> getRaceName(String raceName) {
        return raceRepository.findByRaceName(raceName);
    }
}
