package com.kiranjones.dali.controller;

//import com.kiranjones.dali.exceptions.UserException;
import com.kiranjones.dali.model.UserInfo;
import com.kiranjones.dali.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/app/home")
public class HomeController {

    @Autowired
    private final UserService userService;


    // format: ?dev=true&des=true&pm=true&core=true&mentor=true
    // leave blank for all members
    @GetMapping()
    public List<UserInfo> getMembersByRoles(
            @RequestParam(required = false) Boolean dev,
            @RequestParam(required = false) Boolean des,
            @RequestParam(required = false) Boolean pm,
            @RequestParam(required = false) Boolean core,
            @RequestParam(required = false) Boolean mentor) {
        return userService.findByBooleans(dev, des, pm, core, mentor);
    }

    @GetMapping("/{id}")
    public Optional<UserInfo> getMember(@PathVariable(value = "id") Integer id) {
        return userService.findUserById(id);
    }

}
