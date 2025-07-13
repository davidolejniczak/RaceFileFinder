package WT.RaceFileFinder.Team;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import java.util.List;
import java.util.Optional;

@Service
public class TeamService {

    private final TeamRepository teamRepository;

    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public List<Team> getAllTeams() {
        Sort sort = Sort.by(Sort.Order.asc("teamName"));
        return teamRepository.findAll(sort);
    }

    public Team getTeamByName(String teamName) {
        Optional<Team> foundTeam = teamRepository.findByTeamName(teamName);
        if (foundTeam.isPresent())
            return foundTeam.get();

        foundTeam = teamRepository.findByTeamNameIgnoreCase(teamName);
        if (foundTeam.isPresent())
            return foundTeam.get();

        foundTeam = teamRepository.searchByName(teamName);
        return foundTeam.orElse(null);
    }

    public List<Team> getByNameContaining(String keyword) {
        return teamRepository.findByTeamNameContaining(keyword);
    }
}
