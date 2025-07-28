package com.WT.RaceFileFinder.Race;

import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/all/all")
    public List<Race> getAllRaces() {
        List<Race> races = raceService.getAllRaces();
        System.out.println("[DEBUG] Controller - Retrieved races: " + (races != null ? races.size() : "null"));
        return races;
    }

    @GetMapping("/")
    public List<Race> getRace() {
        return raceService.getRaces();
    }

    @GetMapping("/all/date")
    public List<Race> getRaceDate(@RequestParam String raceName, @RequestParam int raceYear) {
        return raceService.getRaceNameDate(raceName, raceYear);
    }

}
