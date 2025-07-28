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
    @Column(name = "racecountry")
    private String raceCountry;
    @Column(name = "countrycode")
    private String countryCode;
    @Column(name = "racewinner")
    private String raceWinner;
    @Column(name = "hasresults")
    private boolean hasResults;

    protected Race() {
    }

    public Race(String raceId, String raceName, String raceYear, String raceCountry, String countryCode,
            String raceWinner,
            boolean hasResults) {
        this.raceId = raceId;
        this.raceName = raceName;
        this.raceYear = raceYear;
        this.raceCountry = raceCountry;
        this.countryCode = countryCode;
        this.raceWinner = raceWinner;
        this.hasResults = hasResults;
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

    public void setraceCountry(String raceCountry) {
        this.raceCountry = raceCountry;
    }

    public String getraceCountry() {
        return raceCountry;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getRaceWinner() {
        return raceWinner;
    }

    public void setRaceWinner(String raceWinner) {
        this.raceWinner = raceWinner;
    }

    public boolean isHasResults() {
        return hasResults;
    }

    public void setHasResults(boolean hasResults) {
        this.hasResults = hasResults;
    }

}
