package com.Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Backend.Entities.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

}
