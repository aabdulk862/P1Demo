package com.revature.services;

//The Service layer is where we have our business logic
//User input validation, Data manipulation/reformatting, User authentication, etc.

import com.revature.DAOs.TeamDAO;
import com.revature.models.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {

    //autowire the DAO
    private final TeamDAO teamDAO;
    @Autowired
    public TeamService(TeamDAO teamDAO) {
        this.teamDAO = teamDAO;
    }

    //This method inserts new Teams into the DB once they have been validated
    public Team insertTeam(Team team) {

        //Not too much to check, but we can make sure the values are valid

        if (team.getTeamName() == null || team.getTeamName().isBlank()){
            throw new IllegalArgumentException("Team name can't be null or blank!");
        }

        if (team.getTeamLocation() == null || team.getTeamLocation().isBlank()){
            throw new IllegalArgumentException("Team location can't be null or blank!");
        }

        //if none of these ifs get triggered, the Team is valid and can be sent to the DAO

        return teamDAO.save(team);
    }

    public List<Team> getAllTeams(){
        return teamDAO.findAll();
    }

    public List<Team> findTeamByLocation(String location){
        if (location == null || location.isBlank()){
            throw new IllegalArgumentException("Location name can't be null or blank!");
        }
        List<Team> teams = teamDAO.findByTeamLocation(location);
        return teams;
    }

}