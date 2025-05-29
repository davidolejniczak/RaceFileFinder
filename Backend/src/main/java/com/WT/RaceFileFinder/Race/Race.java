package com.WT.RaceFileFinder.Race;

import jakarta.persistence.*;

@Entity
@Table(name = "races")
public class Race {

    @Id
    @Column(name = "raceid", unique = true)
    private String raceId;
    @Column(name = "racename")
    private String raceName;
    @Column(name = "raceyear")
    private String raceYear;

    protected Race() {
    }

    public Race(String raceId, String raceName, String raceYear) {
        this.raceId = raceId;
        this.raceName = raceName;
        this.raceYear = raceYear;
    }

    public String getRaceId() {
        return raceId;
    }

    public void setRaceId(String raceId) {
        this.raceId = raceId;
    }

    public String getRaceName() {
        return raceName;
    }

    public void setRaceName(String raceName) {
        this.raceName = raceName;
    }

    public String getraceYear() {
        return raceYear;
    }

    public void setraceYear(String raceYear) {
        this.raceYear = raceYear;
    }

}
