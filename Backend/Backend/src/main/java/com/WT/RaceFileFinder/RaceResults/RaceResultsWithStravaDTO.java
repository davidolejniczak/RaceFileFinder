package com.WT.RaceFileFinder.RaceResults;

public class RaceResultsWithStravaDTO {
    private String raceName;
    private String riderPosition;
    private String riderName;
    private String riderStrava;

    public RaceResultsWithStravaDTO(String raceName, String riderPosition, String riderName, String riderStrava) {
        this.raceName = raceName;
        this.riderPosition = riderPosition;
        this.riderName = riderName;
        this.riderStrava = riderStrava;
    }

    public String getRaceName() {
        return raceName;
    }

    public String getRiderPosition() {
        return riderPosition;
    }

    public String getRiderName() {
        return riderName;
    }

    public String getRiderStrava() {
        return riderStrava;
    }
}
