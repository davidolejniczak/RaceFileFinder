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

    @Column(name = "riderstrava")
    private String riderStrava;

    @Column(name = "ridercountrycode")
    private String riderCountryCode;

    @Column(name = "racedate")
    private String raceDate;

    protected RaceResults() {
    }

    public RaceResults(String raceName, String riderPosition, String riderName,
            String riderStrava, String riderCountryCode,
            String raceDate) {
        this.raceName = raceName;
        this.riderPosition = riderPosition;
        this.riderName = riderName;
        this.riderStrava = riderStrava;
        this.riderCountryCode = riderCountryCode;
        this.raceDate = raceDate;
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

    public String getRiderStrava() {
        return riderStrava;
    }

    public void setRiderStrava(String riderStrava) {
        this.riderStrava = riderStrava;
    }

    public String getRiderCountryCode() {
        return riderCountryCode;
    }

    public void setRiderCountryCode(String riderCountryCode) {
        this.riderCountryCode = riderCountryCode;
    }

    public String getRaceDate() {
        return raceDate;
    }

    public void setRaceDate(String raceDate) {
        this.raceDate = raceDate;
    }

}
