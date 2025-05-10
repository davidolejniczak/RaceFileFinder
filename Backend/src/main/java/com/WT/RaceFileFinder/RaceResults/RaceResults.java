package com.WT.RaceFile.Race_results;

import jakarta.persistence.*;

@Entity
@Table(name = "raceresults")
public class RaceResults {

    @Id
    @Column(name = "raceid", unique = true)
    private String raceId;
    @Column(name = "racename")
    private String raceName;
    @Column(name = "raceyear")
    private String raceYear;
    @Column(name = "riderposition")
    private String riderPosition;
    @Column(name = "ridername")
    private String riderName;
    @Column(name = "riderstrava")
    private String riderStrava;
    @Column(name = "riderteam")
    private String riderTeam;

    protected RaceResults() {
    }

    public RaceResults(String raceId, String raceName, String raceYear, String riderPosition, String riderName,
            String riderStrava, String riderTeam) {
        this.raceId = raceId;
        this.raceName = raceName;
        this.raceYear = raceYear;
        this.riderPosition = riderPosition;
        this.riderName = riderName;
        this.riderStrava = riderStrava;
        this.riderTeam = riderTeam;
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

    public String getRaceYear() {
        return raceYear;
    }

    public void setRaceYear(String raceYear) {
        this.raceYear = raceYear;
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

    public String getRiderTeam() {
        return riderTeam;
    }

    public void setRiderTeam(String riderTeam) {
        this.riderTeam = riderTeam;
    }

}
