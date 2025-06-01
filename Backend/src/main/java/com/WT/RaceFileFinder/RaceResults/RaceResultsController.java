package com.WT.RaceFileFinder.RaceResults;


import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/raceresults")
public class RaceResultsController {

    private final RaceResultsService raceResultsService;

    public RaceResultsController(RaceResultsService raceResultsService) {
        this.raceResultsService = raceResultsService;
    }

    @GetMapping("/r")
    public List<RaceResults> getRaceResults(@RequestParam String racename) {
        List<RaceResults> results = raceResultsService.getRaceResults(racename);
        return results;
    }

}
