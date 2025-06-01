package com.WT.RaceFileFinder.RaceResults;

import java.io.Serializable;
import java.util.Objects;

public class RaceResultsId implements Serializable {
    private String raceName;
    private String riderPosition;
    private String riderName;

    public RaceResultsId() {
    }

    public RaceResultsId(String raceName, String riderPosition, String riderName) {
        this.raceName = raceName;
        this.riderPosition = riderPosition;
        this.riderName = riderName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RaceResultsId that = (RaceResultsId) o;
        return Objects.equals(raceName, that.raceName) &&
               Objects.equals(riderPosition, that.riderPosition) &&
               Objects.equals(riderName, that.riderName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(raceName, riderPosition, riderName);
    }
}
