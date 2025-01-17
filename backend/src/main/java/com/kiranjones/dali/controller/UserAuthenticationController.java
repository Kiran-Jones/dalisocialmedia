package com.kiranjones.dali.controller;


import com.kiranjones.dali.exceptions.UserException;
import com.kiranjones.dali.model.UserDTO;
import com.kiranjones.dali.model.UserInfo;
import com.kiranjones.dali.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserAuthenticationController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // register user with provided details
    @PostMapping("/app/sign-up")
    public ResponseEntity<UserInfo> signUpUserHandler(@Validated @RequestBody UserDTO user) throws UserException
    {
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        UserInfo info = userService.registerUser(user);

        return new ResponseEntity<>(info,HttpStatus.CREATED);
    }

    // user login with email and password, generates JWT token sent to headers
    @GetMapping("/app/sign-in")
    public ResponseEntity<UserInfo> signInHandler(Authentication auth) throws BadCredentialsException, UserException{

        UserInfo user = userService.findUserByEmail(auth.getName());

        if (user != null)
        {
            return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
        }

        throw new BadCredentialsException("Invalid Username or password");
    }

    // test route, used for verifying logged in status of user during build
    @GetMapping("/app/logged-in/user")
    public ResponseEntity<String> welcomeLoggedInUserHandler() throws UserException
    {
        UserInfo user =  userService.loginUser();

        String message = "Hello you are logged in";

        return new ResponseEntity<String>(message,HttpStatus.OK);
    }
}