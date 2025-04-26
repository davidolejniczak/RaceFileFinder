package com.WT.RaceFileFinder.Rider;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@Configuration
public class RiderConfig {

    private static final Logger log = LoggerFactory.getLogger(RiderConfig.class);

    @Bean
    public CommandLineRunner demo(RiderRepository repository) {
        return (args) -> {
            repository.save(new Rider("David Olejniczak", "Canadian", "XSpeed"));

            // log.info("Riders found with findAll():");
            // log.info("-------------------------------");
            // repository.findAll().forEach(rider -> {
            // log.info("?????????????????");
            // log.info(rider.toString());
            // });
            // log.info("");

            // log.info("Customer found with team):");
            // log.info("--------------------------------");
            // repository.findByTeam("XSpeed").forEach(rider -> {
            // log.info("@@@@@@@@@@@@@@@@@@@@@@");
            // log.info(rider.toString());
            // });

            // log.info("Customer found with Name");
            // log.info("--------------------------------------------");
            // Rider rider = repository.findByRiderName("David Olejniczak");
            // log.info(rider.toString());
            // log.info("");

        };
    }

}
