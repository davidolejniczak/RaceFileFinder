package com.WT.RaceFile.Race_results;

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

    @GetMapping("/")
    public List<RaceResults> getRaceResults(@RequestParam String raceName, @RequestParam String raceYear) {
        return raceResultsService.getRaceResults(raceName, raceYear);
    }

}
