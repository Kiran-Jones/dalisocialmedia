package com.kiranjones.dali.controller;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kiranjones.dali.model.UserDTO;
import com.kiranjones.dali.model.UserInfo;
import com.kiranjones.dali.service.UserService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.List;

@RestController
@RequestMapping("/app")
public class UploadController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @SneakyThrows
    @PostMapping("/upload")
    public ResponseEntity<String> uploadMembers(@RequestParam("file") MultipartFile file) {
        try {

            ObjectMapper objectMapper = new ObjectMapper();

            List<UserInfo> users = objectMapper.readValue(file.getInputStream(), new TypeReference<>() {});

            // function to check if entry data is larger than 255 characters
            for (UserInfo user : users) {
                truncateStringFields(user);

                // adds dartmouth-style email address (as no middle initial is
                // provided in the dataset the emails are not accurate)
                user.setEmail(user.getName().replace(" ", ".")
                        + "@dartmouth.edu");

                // default password: firstNamelastName&birthMonthbirthDay!
                // ex. JohnSmith&0410
                user.setPassword(passwordEncoder.encode( user.getName().replace(" ", "") + "&"
                        + user.getBirthday().replace("-", "")));

                // in current state makes everyone a user
                user.setRole("ROLE_USER");

                // adds a generic blank profile picture if a link is not provided
                if (user.getPicture() == null) {
                    user.setPicture("https://static.thenounproject.com/png/881504-200.png");
                }
            }

            // Save all the extracted members to the database
            userService.saveAll(users);

            return ResponseEntity.ok("Uploaded " + users.size() + " new members");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error uploading members: " + e.getMessage());
        }
    }


    /**
     * helper method to ensure data fits neatly within database
     * @param object object with fields to be truncated
     */
    private void truncateStringFields(Object object) {
        Field[] fields = object.getClass().getDeclaredFields();

        for (Field field : fields) {
            if (field.getType().equals(String.class)) {  // Check if the field is a String
                field.setAccessible(true);
                try {
                    String value = (String) field.get(object);  // Get the field value
                    if (value != null && value.length() > 255) {
                        field.set(object, value.substring(0, 255));  // Truncate the string if it exceeds max length
                    }
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }
        }
    }

}
