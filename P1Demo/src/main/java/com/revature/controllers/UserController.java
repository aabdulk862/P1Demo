package com.revature.controllers;

import com.revature.models.DTOs.IncomingUserDTO;
import com.revature.models.User;
import com.revature.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController //Combines @Controller and @ResponseBody
@RequestMapping("/users") //All HTTP requests ending in /users will be sent here
//TODO: Add @CrossOrigin to allow requests from anywhere
public class UserController {

    //autowire the UserService
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    //A method that inserts a new User into the DB
    @PostMapping //POST requests ending in /users will invoke this method
    public ResponseEntity<User> insertUser(@RequestBody IncomingUserDTO userDTO){

        //send the UserDTO to the service, which will process it and send it to the DAO
        User user = userService.insertUser(userDTO);

        //send back the User object if all goes well
        return ResponseEntity.status(201).body(user);

    }

}