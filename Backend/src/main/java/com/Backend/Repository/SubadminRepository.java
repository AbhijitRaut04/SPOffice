package com.Backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.Backend.Entities.Subadmin;

@Repository
public interface SubadminRepository extends JpaRepository<Subadmin, Long> {
    @Query(value = "SELECT * FROM subadmins  WHERE admin_id = :admin_id", nativeQuery = true)
    List<Subadmin> findByAdminId(Long admin_id);
    
}
