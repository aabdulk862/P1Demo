package com.revature.services;

import com.revature.models.Team;

public class TeamService {

    // TODO: autowire the DAO
    public Team insertTeam(Team team){
        if (team.getTeamName() == null || team.getTeamName().isBlank()){
            throw new IllegalArgumentException("Team name can't be null or blank");
        }

        if (team.getTeamLocation() == null || team.getTeamLocation().isBlank()){
            throw new IllegalArgumentException("Team location can't be null or blank");
        }

        return team;
    }

}
