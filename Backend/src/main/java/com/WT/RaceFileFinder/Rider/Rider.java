package com.WT.RaceFileFinder.Rider;

import jakarta.persistence.*;

@Entity
@Table(name = "riders")
public class Rider {

    @Id
    @Column(name = "riderid", unique = true)
    private String riderID;

    @Column(name = "ridername")
    private String riderName;

    @Column(name = "nation")
    private String riderCountry;

    @Column(name = "team")
    private String riderTeam;

    @Column(name = "countrycode")
    private String countryCode;

    @Column(name = "riderachievements")
    private String riderAchievements;

    @Column(name = "riderstravalink")
    private String riderStravaLink;

    @Column(name = "riderpopular")
    private boolean popular;

    protected Rider() {
    }

    public Rider(String riderName, String riderCountry, String riderTeam, String riderID, String countryCode,
            String riderAchievements, String riderStravaLink, boolean popular) {
        this.riderID = riderID;
        this.riderName = riderName;
        this.riderCountry = riderCountry;
        this.riderTeam = riderTeam;
        this.countryCode = countryCode;
        this.riderAchievements = riderAchievements;
        this.riderStravaLink = riderStravaLink;
        this.popular = popular;
    }

    public void setRiderName(String riderName) {
        this.riderName = riderName;
    }

    public String getRiderName() {
        return riderName;
    }

    public void setRiderCountry(String riderCountry) {
        this.riderCountry = riderCountry;
    }

    public String getridercountry() {
        return riderCountry;
    }

    public void setTeam(String riderTeam) {
        this.riderTeam = riderTeam;
    }

    public String getTeam() {
        return riderTeam;
    }

    public String getRiderID() {
        return riderID;
    }

    public void setRiderID(String riderID) {
        this.riderID = riderID;
    }

    public String getcountryCode() {
        return countryCode;
    }

    public void setcountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getRiderAchievements() {
        return riderAchievements;
    }

    public void setRiderAchievements(String riderAchievements) {
        this.riderAchievements = riderAchievements;
    }

    public String getRiderStravaLink() {
        return riderStravaLink;
    }

    public void setRiderStravaLink(String riderStravaLink) {
        this.riderStravaLink = riderStravaLink;
    }

    public boolean isPopular() {
        return popular;
    }

    public void setPopular(boolean popular) {
        this.popular = popular;
    }
}
