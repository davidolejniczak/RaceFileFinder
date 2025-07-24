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
        // System.out.println("CONTROLLER: ========== NEW REQUEST ==========");
        // System.out.println("CONTROLLER: Received GET request for race results");
        // System.out.println("CONTROLLER: Race name parameter: '" + racename + "'");
        List<RaceResults> results = raceResultsService.getRaceResults(racename);
        // System.out.println("CONTROLLER: Service returned " + results.size() + "
        // results");
        // System.out.println("CONTROLLER: Sending response with " + results.size() + "
        // race results");
        // System.out.println("CONTROLLER: ========== REQUEST COMPLETE ==========");
        return results;
    }

    @GetMapping("/{id}/results")
    public List<RaceResults> getRaceResultsById(@PathVariable String teamId) {
        return raceResultsService.getRaceResultsByTeamId(teamId);
    }

}
