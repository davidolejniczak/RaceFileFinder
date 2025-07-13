package WT.RaceFileFinder.Team;

import java.lang.annotation.Inherited;
import jakarta.persistence.*;

@Entity
@Table(name = "teams")
public class Team {

    @Id
    private String teamID;

    @Column(name = "teamName")
    private String teamName;

    @Column(name = "teamCountry")
    private String teamCountry;

    @Column(name = "countryCode")
    private String countryCode;

    @Column(name = "riderCount")
    private int riderCount;

    @Column(name = "bestResult")
    private String bestResult;

    @Column(name = "teamUrl")
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
        this.bestResult = bestResult;
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

    public String getBestResult() {
        return bestResult;
    }

    public void setBestResult(String bestResult) {
        this.bestResult = bestResult;
    }

    public String getTeamUrl() {
        return teamUrl;
    }

    public void setTeamUrl(String teamUrl) {
        this.teamUrl = teamUrl;
    }

}
