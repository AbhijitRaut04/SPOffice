package com.Backend.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.Backend.Entities.Admin;

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
    public SubadminService(SubadminRepository subadminRepository, AdminRepository adminRepository){
        this.subadminRepository = subadminRepository;
        this.adminRepository = adminRepository;
    }

    public Optional<Subadmin> getSubadminById(Long id) {
        try {
            return subadminRepository.findById(id);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
        return null;
    }
    public Subadmin createSubadmin(Subadmin subadmin, Long adminId) {
        try {
            Admin admin = adminRepository.findById(adminId)
                    .orElseThrow(() -> new IllegalArgumentException("Admin not found with id: " + adminId));
            subadmin.setAdmin(admin);
            Subadmin savedSubadmin = subadminRepository.save(subadmin);
            return savedSubadmin;
        } catch (DataAccessException e) {
            e.printStackTrace();}
        return null;
    }

    public List<Subadmin> getSubadminsByAdminID(Long admin_id){
        try {
            return subadminRepository.findByAdminId(admin_id);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
        return new ArrayList<>();
    }

    public List<Subadmin> getApprovedSubadminsByAdminID(Long admin_id){
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
                    subadmin.setContact(updatedSubadmin.getContact());
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
