package com.kiranjones.dali.service;

import com.kiranjones.dali.exceptions.UserException;
import com.kiranjones.dali.model.UserDTO;
import com.kiranjones.dali.model.UserInfo;
import com.kiranjones.dali.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserInfo registerUser(UserDTO user) throws UserException {

        UserInfo findUser = userRepo.findByEmail(user.getEmail());

        if( findUser != null)
        {
            throw new UserException(" user already exists with this email : "+user.getEmail());
        }

        UserInfo newUser = new UserInfo();

        newUser.setEmail(user.getEmail());
        newUser.setName(user.getName());
        newUser.setPassword(user.getPassword());
        newUser.setRole(user.getRole());


        return userRepo.save(newUser);
    }

    @Override
    public UserInfo loginUser() {

        SecurityContext sc  = SecurityContextHolder.getContext();

        Authentication auth  = sc.getAuthentication();

        String userName = auth.getName();

        UserInfo user = userRepo.findByEmail(userName);

        return user;

    }

    @Override
    public UserInfo findUserByEmail(String email) throws UserException {

        UserInfo user = userRepo.findByEmail(email);

        if (user==null)
        {
            throw new UserException("No user found with this email : " + email);
        }

        return user;
    }

    @Override
    public List<UserInfo> findAllUsers() throws UserException {
        return userRepo.findAll();
    }

    @Override
    public List<UserInfo> saveAll(List<UserInfo> users) throws UserException {
        return userRepo.saveAll(users);
    }

    @Override
    public List<UserInfo> findByBooleans(Boolean dev, Boolean des, Boolean pm, Boolean core, Boolean mentor) {
        return userRepo.findByBooleans(dev, des, pm, core, mentor);
    }

    @Override
    public Optional<UserInfo> findUserById(Integer id) {
        return userRepo.findById(id);
    }

}