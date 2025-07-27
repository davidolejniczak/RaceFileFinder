package com.WT.RaceFileFinder.Rider;

// import jakarta.transaction.Transactional;
// import org.springframework.data.domain.Sort;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
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

        List<Rider> riders;
        if (riderTeam != null && riderCountry != null) {
            riders = riderService.getByTeamAndNation(riderTeam, riderCountry);
        } else if (riderTeam != null) {
            riders = riderService.getByTeam(riderTeam);
        } else if (riderCountry != null) {
            riders = riderService.getByNation(riderCountry);
        } else {
            riders = Collections.emptyList();
        }

        System.out.println("[DEBUG] Controller - Retrieved riders: " + (riders != null ? riders.size() : "null"));
        return riders;
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

    // @PutMapping("/save")
    // public ResponseEntity<String> saveRider(@RequestBody Rider rider) {
    // riderService.saveRider(rider);
    // return ResponseEntity.ok("Rider Info Saved");
    // }

    @GetMapping("/{id}")
    public Rider getRiderById(@PathVariable String riderID) {
        return riderService.getRiderById(riderID);
    }

    @GetMapping("/page")
    public Rider getRiderPage(@RequestParam String riderName) {
        return riderService.getRiderByName(riderName);
    }

    @GetMapping("/{id}/riders")
    public List<Rider> getRidersByTeamId(@PathVariable String id) {
        return riderService.getRidersByTeamId(id);
    }

    @GetMapping("/popular")
    public List<Rider> getPopularRiders() {
        List<Rider> riders = riderService.getPopularRiders();
        System.out.println("[DEBUG] Controller - Retrieved riders: " + (riders != null ? riders.size() : "null"));
        return riderService.getPopularRiders();
    }
}
