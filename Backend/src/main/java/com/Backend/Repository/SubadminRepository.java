package com.Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Backend.Entities.Subadmin;

@Repository
public interface SubadminRepository extends JpaRepository<Subadmin, Long> {

}
