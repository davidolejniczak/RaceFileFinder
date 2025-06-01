package com.WT.RaceFileFinder;

import io.github.cdimascio.dotenv.Dotenv;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class RaceFileFinderApplication {

	public static void main(String[] args) {

		SpringApplication.run(RaceFileFinderApplication.class, args);
	}

	@GetMapping("/")
	public String home() {
		return "cyclingfilefinder api";
	}

}
