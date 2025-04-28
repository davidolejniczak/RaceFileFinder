package com.WT.RaceFileFinder.Rider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/rider")
public class RiderController {

    private final RiderService riderService;

    @GetMapping
    public List<Rider> getRiders(
            @RequestParam(required = false) String riderName,
            @RequestParam(required = false) String nationality,
            @RequestParam(required = false) String team) {
    }

}
