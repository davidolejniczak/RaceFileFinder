package com.WT.RaceFileFinder.RaceResults;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.annotation.Repeatable;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api/raceresults")
@CrossOrigin(origins = "http://localhost:3000")
public class RaceResultsController {

    private final RaceResultsService raceResultsService;

    public RaceResultsController(RaceResultsService raceResultsService) {
        this.raceResultsService = raceResultsService;
    }

    @GetMapping("/r")
    public List<RaceResults> getRaceResults(@RequestParam String racename) {
        System.out.println("Searching for race name: " + racename);
        List<RaceResults> results = raceResultsService.getRaceResults(racename);
        System.out.println("Found " + results.size() + " results");
        return results;
    }

}
