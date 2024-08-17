package com.Backend.Service;

import com.Backend.Dto.PatrollingDto;
import com.Backend.Entities.Admin;
import com.Backend.Entities.Attendance;
import com.Backend.Entities.Patrolling;
import com.Backend.Entities.Police;
import com.Backend.Entities.Subadmin;
import com.Backend.Repository.AdminRepository;
import com.Backend.Repository.PatrollingRepository;
import com.Backend.Repository.PoliceRepository;
import com.Backend.Repository.SubadminRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatrollingService {

    @Autowired
    private PatrollingRepository patrollingRepository;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private PoliceRepository policeRepository;
    @Autowired
    private SubadminRepository subadminRepository;
    @Autowired
    private AttendanceService attendanceService;

    public List<Patrolling> getAllPatrollings() {
        return patrollingRepository.findAll();
    }

    public List<Patrolling> getPatrollingsOfAdmin(Long admin_id) {
        return patrollingRepository.findPatrollingsOfAdmin(admin_id);
    }

    public List<Patrolling> getPatrollingsOfSubdmin(Long subadmin_id) {
        Optional<Subadmin> subadmin = subadminRepository.findById(subadmin_id);
        Subadmin sub = subadmin.get();
        return patrollingRepository.findPatrollingsOfAdmin(sub.getAdmin().getId());
    }

    public Optional<Patrolling> getPatrollingById(Long id) {
        return patrollingRepository.findById(id);
    }

    public Patrolling createPatrolling(PatrollingDto patrollingDTO) {
        Patrolling patrolling = new Patrolling();
        patrolling.setDate(patrollingDTO.getDate());
        patrolling.setEventname(patrollingDTO.getEventname());
        patrolling.setDescription(patrollingDTO.getDescription());

        if (patrollingDTO.getAdminId() != null) {
            Admin admin = adminRepository.findById(patrollingDTO.getAdminId())
                    .orElseThrow(() -> new RuntimeException("Admin not found"));
            patrolling.setAdmin(admin);
        }

        if (patrollingDTO.getHeadId() != null) {
            Police head = policeRepository.findById(patrollingDTO.getHeadId())
                    .orElseThrow(() -> new RuntimeException("Police not found"));
            patrolling.setHead(head);
        }

        return patrollingRepository.save(patrolling);
    }

    public Patrolling updatePatrolling(Long id, PatrollingDto patrollingDTO) {
        try {
            Patrolling patrolling = patrollingRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Patrolling not found"));

            patrolling.setDate(patrollingDTO.getDate());
            patrolling.setEventname(patrollingDTO.getEventname());
            patrolling.setDescription(patrollingDTO.getDescription());

            if (patrollingDTO.getAdminId() != null) {
                Admin admin = adminRepository.findById(patrollingDTO.getAdminId())
                        .orElseThrow(() -> new RuntimeException("Admin not found"));
                patrolling.setAdmin(admin);
            }

            if (patrollingDTO.getHeadId() != null) {
                Police head = policeRepository.findById(patrollingDTO.getHeadId())
                        .orElseThrow(() -> new RuntimeException("Police not found"));
                patrolling.setHead(head);
            }

            return patrollingRepository.save(patrolling);

        } catch (DataAccessException e) {
            throw new RuntimeException("Failed to update Patrolling", e);
        }
    }

    public boolean deletePatrolling(Long id) {
        try {
            patrollingRepository.deleteById(id);
            return true;
        } catch (DataAccessException e) {
            throw new RuntimeException("Failed to delete Patrolling", e);
        }
    }

    public Patrolling createAttendance(Long id) {
        try {
            Patrolling patrolling = patrollingRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Patrolling not found"));

            Attendance attendance = attendanceService.createAttendance(id);

            patrolling.setAttendance(attendance);

            return patrollingRepository.save(patrolling);

        } catch (DataAccessException e) {
            throw new RuntimeException("Failed to create Attendance", e);
        }
    }

    public Patrolling sendAttendance(Long patrolling_id, Long subadmin_id, List<Long> polices ) {
        try {
            Patrolling patrolling = patrollingRepository.findById(patrolling_id)
                    .orElseThrow(() -> new RuntimeException("Patrolling not found"));

            Attendance attendance = attendanceService.sendAttendance(patrolling.getAttendance().getId(), subadmin_id, polices);

            patrolling.setAttendance(attendance);

            return patrollingRepository.save(patrolling);

        } catch (DataAccessException e) {
            throw new RuntimeException("Failed to create Attendance", e);
        }
    }

}
