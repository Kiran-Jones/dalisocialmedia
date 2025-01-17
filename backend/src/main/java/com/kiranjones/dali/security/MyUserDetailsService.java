package com.kiranjones.dali.security;

import com.kiranjones.dali.model.UserInfo;
import com.kiranjones.dali.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class MyUserDetailsService  implements UserDetailsService{

    @Autowired
    private UserRepository userRepo;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        UserInfo user  = userRepo.findByEmail(email);

        if (user != null)
        {
            return new MyUserDetails(user);
        }

        throw new UsernameNotFoundException("user not found with this email : "+email);
    }

}