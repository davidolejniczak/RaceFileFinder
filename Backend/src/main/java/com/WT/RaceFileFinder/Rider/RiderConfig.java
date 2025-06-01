package com.WT.RaceFileFinder.Rider;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Configuration
public class RiderConfig {

    private static final Logger log = LoggerFactory.getLogger(RiderConfig.class);

    @Bean
    public CommandLineRunner demo(RiderRepository repository) {
        return (args) -> {
            repository.save(new Rider("David Olejniczak", "Canadian", "XSpeed"));

        };
    }

}
