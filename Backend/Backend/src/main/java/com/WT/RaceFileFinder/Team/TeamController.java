package com.WT.RaceFileFinder.Team;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api/teams")
public class TeamController {

    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping("/{id}")
    public Team getTeamById(@PathVariable String teamId) {
        System.out.println("[DEBUG] Controller - Retrieving team by id: " + teamId);
        Team team = teamService.getTeamById(teamId);
        System.out.println("[DEBUG] Controller - Retrieved teams: " + (team != null ? team : "null"));
        return team;
    }

    @GetMapping("/name")
    public Team getTeam(@RequestParam String teamName) {
        return teamService.getTeamByName(teamName);
    }

    // @GetMapping("/all")
    // public List<String> getAllTeams(@RequestParam(required = false) String q) {
    // List<Team> teams;
    // if (q != null && !q.isEmpty()) {
    // teams = teamService.getByNameContaining(q);
    // } else {
    // teams = teamService.getAllTeams();
    // }

    // System.out.println("[DEBUG] Controller - Retrieved teams: " + (teams != null
    // ? teams.size() : "null"));
    // return teams.stream().map(Team::getTeamName).collect(Collectors.toList());
    // }

    @GetMapping("/all")
    public List<Team> getAllTeams() {
        List<Team> teams;
        teams = teamService.getAllTeams();

        System.out.println("[DEBUG] Controller - Retrieved teams: " + (teams != null ? teams.size() : "null"));
        return teams;
    }

}
