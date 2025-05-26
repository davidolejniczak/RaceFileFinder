package com.WT.RaceFileFinder.Race;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.annotation.Repeatable;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api/race")
public class RaceController {

    private final RaceService raceService;

    public RaceController(RaceService raceService) {
        this.raceService = raceService;
    }

    @GetMapping("/all")
    public List<Race> getRace(@RequestParam String raceName) {
        return raceService.getRaceName(raceName);
    }

    @GetMapping("/all/date")
    public List<Race> getRaceDate(@RequestParam String raceName, @RequestParam int raceYear) {
        return raceService.getRaceNameDate(raceName, raceYear);
    }

}
