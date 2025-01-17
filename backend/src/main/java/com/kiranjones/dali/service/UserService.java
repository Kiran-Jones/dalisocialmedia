package com.kiranjones.dali.service;

import com.kiranjones.dali.exceptions.UserException;
import com.kiranjones.dali.model.UserDTO;
import com.kiranjones.dali.model.UserInfo;
import org.apache.catalina.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    public UserInfo registerUser(UserDTO user) throws UserException;
    public UserInfo loginUser()  throws UserException;
    public UserInfo findUserByEmail(String email)  throws UserException;
    public List<UserInfo> findAllUsers() throws UserException;
    public List<UserInfo> saveAll(List<UserInfo> users) throws UserException;

    List<UserInfo> findByBooleans(Boolean dev, Boolean des, Boolean pm, Boolean core, Boolean mentor);

    Optional<UserInfo> findUserById(Integer id);
}
