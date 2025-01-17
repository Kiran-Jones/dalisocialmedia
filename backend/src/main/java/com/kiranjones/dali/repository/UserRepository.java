package com.kiranjones.dali.repository;

import com.kiranjones.dali.model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;


@Repository
public interface UserRepository  extends JpaRepository<UserInfo, Integer>{

    UserInfo findByEmail(String username);

    @Query("SELECT m FROM UserInfo m WHERE " +
            "(:dev IS NULL OR m.dev = :dev) AND " +
            "(:des IS NULL OR m.des = :des) AND " +
            "(:pm IS NULL OR m.pm = :pm) AND " +
            "(:core is NULL OR m.core = :core) AND " +
            "(:mentor is NULL OR m.mentor = :mentor)")
    List<UserInfo> findByBooleans(@Param("dev") Boolean dev,
                               @Param("des") Boolean des,
                               @Param("pm") Boolean pm,
                               @Param("core") Boolean core,
                               @Param("mentor") Boolean mentor);
}
