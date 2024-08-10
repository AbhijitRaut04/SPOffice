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

    public List<Subadmin> getAllSubadmins(){
        try {
            return subadminRepository.findAll();
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
        return new ArrayList<>();
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
            return subadminRepository.save(subadmin);
        } catch (DataAccessException e) {
            e.printStackTrace();}
        return null;
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
