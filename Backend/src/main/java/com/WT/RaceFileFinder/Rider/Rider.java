package com.WT.RaceFileFinder.Rider;

import jakarta.persistence.*;

@Entity
@Table(name = "riders")
public class Rider {

    @Id
    @Column(name = "ridername", unique = true)
    private String riderName;
    private String nation;
    private String team;

    protected Rider() {
    }

    public Rider(String riderName, String nation, String team) {
        this.riderName = riderName;
        this.nation = nation;
        this.team = team;
    }

    public void setRiderName(String riderName) {
        this.riderName = riderName;
    }

    public String getRiderName() {
        return riderName;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getNation() {
        return nation;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public String getTeam() {
        return team;
    }

    @Override
    public String toString() {
        try {
            String returnString = String.format(
                    "\nRider[\nRider Name %s\nNationality = %s\nTeam = %s\n]",
                    riderName, nation, team);
            return returnString;
        } catch (Exception e) {
            return ("\nRider is not found\n");
        }
    }

}
