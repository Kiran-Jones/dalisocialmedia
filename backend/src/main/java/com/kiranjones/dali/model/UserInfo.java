package com.kiranjones.dali.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.beans.factory.annotation.Value;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

@Entity
@Table(name = "member_data")
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(NON_DEFAULT)
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    @Size(min = 3,max = 20 , message = "Enter minimum 3 character and maximum 20 characters in full name.")
    private String name;

    @Pattern(
            regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$",
            message = "Invalid password. It must contain at least 8 characters, including at least one digit, one lowercase letter, one uppercase letter, and one special character."
    )
    private String password;

    @Column(unique = true)
    @Email(message = "Enter a valid Email.")
    private String email;

    @Value("{userInfo.role:ROLE_USER}")
    private String role;

    @Value("{userInfo.year:2XXX}")
    private String year;

    @Value("{userInfo.dev:false}")
    private boolean dev;

    @Value("{userInfo.des:false}")
    private boolean des;

    @Value("{userInfo.pm:false}")
    private boolean pm;

    @Value("{userInfo.pm:false}")
    private boolean core;

    @Value("{userInfo.mentor:false}")
    private boolean mentor;

    @Value("{userInfo.major:}")
    private String major;
    private String minor;
    private String birthday;
    private String home;

    private String quote;

    @JsonProperty("favorite thing 1")
    private String favoriteThing1;

    @JsonProperty("favorite thing 2")
    private String favoriteThing2;

    @JsonProperty("favorite thing 3")
    private String favoriteThing3;

    @JsonProperty("favorite dartmouth tradition")
    private String favoriteDartmouthTradition;

    @JsonProperty("fun fact")
    private String funFact;

    private String picture;


    @Override
    public String toString() {
        return name + " '" + year + ", " + major;
    }

}