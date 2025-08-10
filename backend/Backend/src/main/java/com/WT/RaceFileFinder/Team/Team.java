package com.WT.RaceFileFinder.Team;

import jakarta.persistence.*;

@Entity
@Table(name = "teams")
public class Team {

    @Id
    private String teamID;

    @Column(name = "teamname")
    private String teamName;

    @Column(name = "teamcountry")
    private String teamCountry;

    @Column(name = "countrycode")
    private String countryCode;

    @Column(name = "ridercount")
    private int riderCount;

    @Column(name = "bestresult")
    private String teamBestResult;

    @Column(name = "teamurl")
    private String teamUrl;

    protected Team() {
    }

    public Team(String teamID, String teamName, String teamCountry, String countryCode, int riderCount,
            String bestResult, String teamUrl) {
        this.teamID = teamID;
        this.teamName = teamName;
        this.teamCountry = teamCountry;
        this.countryCode = countryCode;
        this.riderCount = riderCount;
        this.teamBestResult = bestResult;
        this.teamUrl = teamUrl;
    }

    public String getTeamID() {
        return teamID;
    }

    public void setTeamID(String teamID) {
        this.teamID = teamID;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getTeamCountry() {
        return teamCountry;
    }

    public void setTeamCountry(String teamCountry) {
        this.teamCountry = teamCountry;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public int getRiderCount() {
        return riderCount;
    }

    public void setRiderCount(int riderCount) {
        this.riderCount = riderCount;
    }

    public String getTeamBestResult() {
        return teamBestResult;
    }

    public void setTeamBestResult(String bestResult) {
        this.teamBestResult = bestResult;
    }

    public String getTeamUrl() {
        return teamUrl;
    }

    public void setTeamUrl(String teamUrl) {
        this.teamUrl = teamUrl;
    }

}
