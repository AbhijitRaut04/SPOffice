package com.Backend.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.Backend.Entities.Admin;
import com.Backend.Repository.AdminRepository;

@Service
public class AdminService {

	@Autowired
    private final AdminRepository adminRepository;

    @Autowired
    private final PasswordEncoder passwordEncoder;
	
    public AdminService(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<Admin> getAdminByUsername(String username) {
        try {
            return adminRepository.getAdminByUsername(username);
        } catch (DataAccessException e) {
            throw new RuntimeException("Failed to fetch admin by username", e);
        }
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

        String hashPassword = passwordEncoder.encode(admin.getPassword());
        admin.setPassword(hashPassword);

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

