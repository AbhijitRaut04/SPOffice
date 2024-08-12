package com.Backend.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.Backend.Entities.Request;
import java.util.List;


public interface RequestRepository extends JpaRepository<Request, Long> {

    List<Request> findByAdminId(Long adminId);

}
