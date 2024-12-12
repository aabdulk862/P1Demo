package com.revature.controllers;

//The Controller layer handles HTTP Requests (sends back HTTP responses!)

import com.revature.models.Team;
import com.revature.services.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController //Combines @Controller and @ResponseBody
@RequestMapping("/teams") //All HTTP requests ending in /teams will be sent here
//TODO: Add @CrossOrigin annotation to allow HTTP from anywhere
public class TeamController {

    private TeamService teamService;

    @Autowired
    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    //Insert a new Team (HTTP POST request)
    @PostMapping
    public ResponseEntity<Team> insertTeam(@RequestBody Team team) {

        //Send team to the service which will send it to the DAO
        Team newTeam = teamService.insertTeam(team);
        return ResponseEntity.ok(newTeam);

        //ResponseEntity helps us build an HTTP Response
        //.ok() sets the status code to 200
        //we send the team object back in the response body
    }

    @GetMapping
    public ResponseEntity<List<Team>> getAllTeams(){
        List<Team> teams = teamService.getAllTeams();
        return ResponseEntity.ok(teams);
    }

    @GetMapping("/location/{location}")
    public ResponseEntity<?> getTeamByLocation(@PathVariable String location){
        List<Team> teams = teamService.findTeamByLocation(location);
        if (teams.isEmpty()){
            return ResponseEntity.status(404).body("No teams found in " + location);
        }
        return ResponseEntity.ok(teams);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
    }

}
