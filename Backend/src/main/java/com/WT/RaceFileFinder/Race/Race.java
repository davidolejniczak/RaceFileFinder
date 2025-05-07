package com.WT.RaceFileFinder.Race;

import jakarta.persistence.*;

@Entity
@Table(name = "races")
public class Race {

    @Id
    @Column(name = "raceId", unique = true)
    private String raceId;
    private String raceName;
    private String raceDate;
    private String raceLocation;
    private String raceLevel;

    protected Race() {
    }

    public Race(String raceName, String raceDate, String raceLocation, String raceLevel) {
        this.raceName = raceName;
        this.raceDate = raceDate;
        this.raceLocation = raceLocation;
        this.raceLevel = raceLevel;
    }

    public String getRaceName() {
        return raceName;
    }

    public void setRaceName(String raceName) {
        this.raceName = raceName;
    }

    public String getRaceDate() {
        return raceDate;
    }

    public void setRaceDate(String raceDate) {
        this.raceDate = raceDate;
    }

    public String getRaceLocation() {
        return raceLocation;
    }

    public void setRaceLocation(String raceLocation) {
        this.raceLocation = raceLocation;
    }

    public String getRaceLevel() {
        return raceLevel;
    }

    public void setRaceLevel(String raceLevel) {
        this.raceLevel = raceLevel;
    }

}
