package WT.RaceFileFinder.Team;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api/Team")
public class TeamController {

    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Team> getTeamById(@PathVariable String teamId) {
        return teamService.getTeamById(teamId);
    }

    @GetMapping("/name")
    public Team getTeam(@RequestParam String teamName) {
        return teamService.getTeamByName(teamName);
    }

    @GetMapping("/all")
    public List<String> getAllTeams(@RequestParam(required = false) String q) {
        List<Team> teams;
        if (q != null && !q.isEmpty()) {
            teams = teamService.getByNameContaining(q);
        } else {
            teams = teamService.getAllTeams();
        }
        return teams.stream().map(Team::getTeamName).collect(Collectors.toList());
    }

}
