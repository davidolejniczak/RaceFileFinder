package com.WT.RaceFileFinder.Rider;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api")
@CrossOrigin(origins = "http://localhost:3000")
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

    @GetMapping("/all")
    public List<String> getAllRiders(@RequestParam(required = false) String q) {
        List<Rider> riders;
        if (q != null && !q.isEmpty()) {
            riders = riderService.getByNameContaining(q);
        } else {
            riders = riderService.getAllRiders();
        }
        return riders.stream().map(Rider::getRiderName).collect(Collectors.toList());
    }

    @PutMapping("/save")
    public ResponseEntity<String> saveRider(@RequestBody Rider rider) {
        riderService.saveRider(rider);
        return ResponseEntity.ok("Rider Info Saved");
    }

}
