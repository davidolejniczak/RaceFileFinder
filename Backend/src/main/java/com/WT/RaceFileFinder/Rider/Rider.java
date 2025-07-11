package com.WT.RaceFileFinder.Rider;

import jakarta.persistence.*;

@Entity
@Table(name = "riders")
public class Rider {

    @Id
    @Column(name = "riderID", unique = true)
    private String riderID;

    private String riderName;

    @Column(name = "nation")
    private String riderCountry;

    @Column(name = "team")
    private String riderTeam;

    private String riderCountryCode;
    private String riderAchievements;
    private String riderStravaLink;

    protected Rider() {
    }

    public Rider(String riderName, String riderCountry, String riderTeam, String riderID, String riderCountryCode,
            String riderAchievements, String riderStravaLink) {
        this.riderID = riderID;
        this.riderName = riderName;
        this.riderCountry = riderCountry;
        this.riderTeam = riderTeam;
        this.riderCountryCode = riderCountryCode;
        this.riderAchievements = riderAchievements;
        this.riderStravaLink = riderStravaLink;
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
        return ridercountry;
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

    public String getRiderCountryCode() {
        return riderCountryCode;
    }

    public void setRiderCountryCode(String riderCountryCode) {
        this.riderCountryCode = riderCountryCode;
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

    @Override
    public String toString() {
        try {
            String returnString = String.format(
                    "\nRider[\nRider Name %s\nridercountryality = %s\nTeam = %s\n]",
                    riderName, ridercountry, riderTeam);
            return returnString;
        } catch (Exception e) {
            return ("\nRider is not found\n");
        }
    }

}
