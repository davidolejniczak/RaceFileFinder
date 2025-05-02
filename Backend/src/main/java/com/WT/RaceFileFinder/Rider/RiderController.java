package com.WT.RaceFileFinder.Rider;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping(path = "/api")
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
            @RequestParam(required = false) String nationality) {

        if (team != null && nationality != null) {
            return riderService.getByTeamAndNationality(team, nationality);
        }

        if (nationality == null) {
            return riderService.getByTeam(team);
        }

        else {
            return riderService.getByNationality(nationality);
        }
    }

    @GetMapping("/all")
    public List<Rider> getAllRiders() {
        return riderService.getAllRiders();
    }

    @PutMapping("/save")
    public ResponseEntity<String> saveRider(@RequestBody Rider rider) {
        riderService.saveRider(rider);
        return ResponseEntity.ok("Rider Info Saved");
    }

}
