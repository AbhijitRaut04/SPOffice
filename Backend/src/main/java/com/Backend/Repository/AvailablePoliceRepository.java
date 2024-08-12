package com.Backend.Repository;

import com.Backend.Entities.AvailablePolice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AvailablePoliceRepository extends JpaRepository<AvailablePolice,Long> {

    // This is used to fetch available police for a given event (patrolling)
    @Query(value = "SELECT ap.available_id AS availableId, p.id AS policeId, p.fullname, p.designation,p.subadmin_id, p.gender, p.phone " +
            "FROM available_police ap " +
            "JOIN polices p ON ap.police_id = p.id " +
            "WHERE ap.event_id = :eventId", nativeQuery = true)
    List<Object[]> findAvailablePoliceByEventId(Long eventId);
}
