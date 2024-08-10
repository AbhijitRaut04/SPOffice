package com.Backend.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.Backend.Entities.Admin;
import com.Backend.Repository.AdminRepository;

@Service
public class AdminService {

	@Autowired
    private final AdminRepository adminRepository;
	
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public List<Admin> getAllAdmins() {
        try {
            return adminRepository.findAll();
        } catch (DataAccessException e) {
            
            e.printStackTrace();
        }
        return new ArrayList<>();
    }

    public Optional<Admin> getAdminById(Long id) {
        try {
            return adminRepository.findById(id);
        } catch (DataAccessException e) {
            throw new RuntimeException("Failed to fetch admin by ID", e);
        }
    }

    public Admin createAdmin(Admin admin) {
        try {
        	System.out.println(admin);
        	System.out.println("______________________________________________");
            return adminRepository.save(admin);
        } catch (DataAccessException e) {
            throw new RuntimeException("Failed to create admin", e);
        }
    }

    public Admin updateAdmin(Long id, Admin updatedAdmin) {
        try {
            return adminRepository.findById(id)
                .map(admin -> {
                    admin.setUsername(updatedAdmin.getUsername());
                    admin.setPassword(updatedAdmin.getPassword());
                    admin.setContact(updatedAdmin.getContact());
                    admin.setDistrict(updatedAdmin.getDistrict());
                    return adminRepository.save(admin);
                })
                .orElseGet(() -> {
                    updatedAdmin.setId(id);
                    return adminRepository.save(updatedAdmin);
                });
        } catch (DataAccessException e) {
            throw new RuntimeException("Failed to update admin", e);
        }
    }

    public void deleteAdmin(Long id) {
        try {
            adminRepository.deleteById(id);
        } catch (DataAccessException e) {
            throw new RuntimeException("Failed to delete admin", e);
        }
    }
}

