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
            @RequestParam(required = false) String riderTeam,
            @RequestParam(required = false) String riderCountry) {

        if (riderTeam != null && riderCountry != null) {
            return riderService.getByTeamAndNation(riderTeam, riderCountry);
        }
        if (riderTeam != null) {
            return riderService.getByTeam(riderTeam);
        }
        if (riderCountry != null) {
            return riderService.getByNation(riderCountry);
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

    @GetMapping("/{id}")
    public ResponseEntity<Rider> getRiderById(@PathVariable String riderId) {
        return riderService.getRiderById(riderId);
    }

    @GetMapping("/page")
    public ResponseEntity<Rider> getRiderPage(@RequestParam String riderName) {
        return riderService.getRiderByName(riderName);
    }

    @GetMapping("/{id}/riders")
    public List<Rider> getRidersByTeamId(@PathVariable String id) {
        return riderService.getRidersByTeamId(id);
    }

    @GetMapping("/popular")
    public List<Rider> getPopularRiders() {
        return riderService.getPopularRiders();
    }
}
