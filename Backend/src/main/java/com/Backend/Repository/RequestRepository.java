package com.Backend.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.Backend.Entities.Admin;
import com.Backend.Entities.Request;
import java.util.List;


public interface RequestRepository extends JpaRepository<Request, Long> {


    // List<Request> findByAdmin(Admin admin);

    List<Request> findByAdminId(Long adminId);

}
