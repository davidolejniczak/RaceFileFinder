package com.WT.RaceFileFinder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class RaceFileFinderApplication {

	public static void main(String[] args) {

		SpringApplication.run(RaceFileFinderApplication.class, args);
	}

	@GetMapping("/")
	public void home() {
	}

}
