package com.WT.RaceFileFinder.Rider;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api/rider")
public class RiderController {

    private final RiderService riderService;

    public RiderController(RiderService riderService) {
        this.riderService = riderService;
    }

    @GetMapping("/name")
    public Rider getRider(@RequestParam String riderName) {
        return riderService.getRiderByName(riderName);
    }

    @GetMapping("/info")
    public List<Rider> getRiders(
            @RequestParam(required = false) String team,
            @RequestParam(required = false) String nation) {

        if (team != null && nation != null) {
            return riderService.getByTeamAndNation(team, nation);
        }
        if (team != null) {
            return riderService.getByTeam(team);
        }
        if (nation != null) {
            return riderService.getByNation(nation);
        } else {
            return Collections.emptyList();
        }
    }



}
