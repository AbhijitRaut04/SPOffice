package com.Backend.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import com.Backend.Dto.PoliceDto;
import com.Backend.Dto.SubadminDto;
import com.Backend.Entities.Admin;
import com.Backend.Entities.Attendance;
import com.Backend.Entities.Police;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.Backend.Entities.Subadmin;
import com.Backend.Repository.SubadminRepository;
import com.Backend.Repository.AdminRepository;

@Service
public class SubadminService {

    private final SubadminRepository subadminRepository;
    private final AdminRepository adminRepository;

    @Autowired
    public SubadminService(SubadminRepository subadminRepository, AdminRepository adminRepository) {
        this.subadminRepository = subadminRepository;
        this.adminRepository = adminRepository;
    }

    public Optional<Subadmin> getSubdminByUsername(String username) {
        try {
            return subadminRepository.getSubdminByUsername(username);
        } catch (DataAccessException e) {
            throw new RuntimeException("Failed to fetch subadmin by username", e);
        }
    }

    public SubadminDto getSubadminById(Long id) {
        try {
            Subadmin subadmin = subadminRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Subadmin not found with ID: " + id));

            Set<PoliceDto> policeDtos = subadmin.getPolices().stream()
                    .map(police -> new PoliceDto().buildPolice(police))
                    .collect(Collectors.toSet());

            Set<Attendance> attendances = subadmin.getAttendances().stream()
                    .map(attendance -> {
                        Set<Police> polices = attendance.getPolices().stream()
                                .filter(police -> police.getSubadmin().getId().equals(id))
                                .collect(Collectors.toSet());
                        attendance.setPolices(polices);

                        return attendance;
                    })
                    .collect(Collectors.toSet());

            return new SubadminDto().buildSubadmin(subadmin, policeDtos, attendances);

        } catch (DataAccessException e) {
            throw new RuntimeException("Failed to fetch subadmin by ID", e);
        }
    }

    public Subadmin createSubadmin(Subadmin subadmin, Long adminId) {
        try {
            Admin admin = adminRepository.findById(adminId)
                    .orElseThrow(() -> new IllegalArgumentException("Admin not found with id: " + adminId));
            subadmin.setAdmin(admin);
            Subadmin savedSubadmin = subadminRepository.save(subadmin);
            return savedSubadmin;
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
        return null;
    }

    public Set<SubadminDto> getSubadminsByAdminID(Long adminId) {
        try {
            List<Subadmin> subadmins = subadminRepository.findByAdminId(adminId);
    
            return subadmins.stream()
                    .map(subadmin -> this.getSubadminById(subadmin.getId())) 
                    .collect(Collectors.toSet());
    
        } catch (DataAccessException e) {
            e.printStackTrace(); 
        }
    
        return Collections.emptySet();
    }
    

    public List<Subadmin> getApprovedSubadminsByAdminID(Long admin_id) {
        try {
            return subadminRepository.findApprovedByAdminId(admin_id);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
        return new ArrayList<>();
    }

    // Sets Subadmin Status to NOT_APPROVED
    public Subadmin setStatusToRejected(Long id) {
        try {
            Optional<Subadmin> subadmin = subadminRepository.findById(id);
            if (subadmin.isPresent()) {
                Subadmin existingSubadmin = subadmin.get();
                existingSubadmin.setStatus("NOT_APPROVED");
                return subadminRepository.save(existingSubadmin);
            }
            throw new RuntimeException("Subadmin not found");
        } catch (Exception e) {
            throw new RuntimeException("Error updating status", e);
        }
    }

    // Sets Subadmin Status to APPROVED
    public Subadmin setStatusToApproved(Long id) {
        try {
            Optional<Subadmin> subadmin = subadminRepository.findById(id);
            if (subadmin.isPresent()) {
                Subadmin existingSubadmin = subadmin.get();
                existingSubadmin.setStatus("APPROVED");
                return subadminRepository.save(existingSubadmin);
            }
            throw new RuntimeException("Subadmin not found");
        } catch (Exception e) {
            throw new RuntimeException("Error updating status", e);
        }
    }

    public Subadmin updateSubadmin(Long id, Subadmin updatedSubadmin) {
        try {
            return subadminRepository.findById(id)
                    .map(subadmin -> {
                        subadmin.setUsername(updatedSubadmin.getUsername());
                        subadmin.setPassword(updatedSubadmin.getPassword());
                        subadmin.setEmail(updatedSubadmin.getEmail());
                        subadmin.setPhone(updatedSubadmin.getPhone());
                        subadmin.setStation(updatedSubadmin.getStation());
                        return subadminRepository.save(subadmin);
                    })
                    .orElseGet(() -> {
                        updatedSubadmin.setId(id);
                        return subadminRepository.save(updatedSubadmin);
                    });
        } catch (DataAccessException e) {
            throw new RuntimeException("Failed to update admin", e);
        }
    }

    public boolean deleteSubadmin(Long id) {
        try {
            subadminRepository.deleteById(id);
            return true;
        } catch (DataAccessException e) {
            throw new RuntimeException("Failed to delete admin", e);
        }
    }

}
