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
        System.out.println("Searching for race name: " + racename);
        List<RaceResults> results = raceResultsService.getRaceResults(racename);
        System.out.println("Controller found " + results.size() + " results");
        return results;
    }

}
