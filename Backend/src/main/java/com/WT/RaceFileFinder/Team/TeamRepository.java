package WT.RaceFileFinder.Team;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, String>, PagingAndSortingRepository<Team, String> {

    Optional<Team> findByTeamName(String teamName);

    Optional<Team> findByTeamNameIgnoreCase(String teamName);

    @Query(value = "SELECT * FROM teams WHERE REPLACE(LOWER(unaccent(teamName)), ' ', '') = REPLACE(LOWER(unaccent(:teamName)),' ','')", nativeQuery = true)
    Optional<Team> searchByName(@Param("teamName") String teamName);

    @Query(value = "SELECT * FROM teams WHERE unaccent(teamName) ILike unaccent(CONCAT('%', :keyword, '%'))", nativeQuery = true)
    List<Team> findByTeamNameContaining(String keyword);
}
