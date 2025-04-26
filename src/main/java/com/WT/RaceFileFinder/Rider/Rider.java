package com.WT.RaceFileFinder.Rider;

import javax.annotation.processing.Generated;
import jakarta.persistence.*;

@Entity
@Table(name = "riders")
public class Rider {

    @Id
    @Column(riderName = "ridername", unique = true)
    private String riderName;
    private String nationality;
    private String team;

    protected Rider() {
    }

    public Rider(String riderName, String nationality, String team) {
        this.riderName = riderName;
        this.nationality = nationality;
        this.team = team;
    }

    public void setRiderName(String riderName) {
        this.riderName = riderName;
    }

    public String getRiderName() {
        return riderName;
    }

    public void setNationality(String nationallity) {
        this.nationality = nationallity;
    }

    public String getNationality() {
        return nationality;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public String getTeam() {
        return team;
    }

    @Override
    public String toString() {
        return String.format(
                "Rider[Name='&s',Nationality='%s',Team='%s']",
                riderName, nationality, team);
    }

}
