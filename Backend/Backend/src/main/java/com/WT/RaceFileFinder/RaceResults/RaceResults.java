package com.WT.RaceFileFinder.RaceResults;

import jakarta.persistence.*;

@Entity
@Table(name = "raceresults")
@IdClass(RaceResultsId.class)
public class RaceResults {

    @Id
    @Column(name = "racename")
    private String raceName;

    @Id
    @Column(name = "riderposition")
    private String riderPosition;

    @Id
    @Column(name = "ridername")
    private String riderName;

    @Column(name = "riderteam")
    private String riderTeam;

    @Column(name = "countrycode")
    private String countryCode;

    @Column(name = "racedate")
    private String raceDate;

    protected RaceResults() {
    }

    public RaceResults(String raceName, String riderPosition, String riderName,
            String riderTeam, String countryCode,
            String raceDate) {
        this.raceName = raceName;
        this.riderPosition = riderPosition;
        this.riderName = riderName;
        this.countryCode = countryCode;
        this.raceDate = raceDate;
        this.riderTeam = riderTeam;
    }

    public String getRaceName() {
        return raceName;
    }

    public void setRaceName(String raceName) {
        this.raceName = raceName;
    }

    public String getRiderPosition() {
        return riderPosition;
    }

    public void setRiderPosition(String riderPosition) {
        this.riderPosition = riderPosition;
    }

    public String getRiderName() {
        return riderName;
    }

    public void setRiderName(String riderName) {
        this.riderName = riderName;
    }

    public String getRiderTeam() {
        return riderTeam;
    }

    public void setRiderTeam(String riderTean) {
        this.riderTeam = riderTean;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getRaceDate() {
        return raceDate;
    }

    public void setRaceDate(String raceDate) {
        this.raceDate = raceDate;
    }

}
