package com.Backend.Controller;

import com.Backend.Entities.Admin;
import com.Backend.Entities.Request;
import com.Backend.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admins")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdminById(@PathVariable Long id) {
        Optional<Admin> admin = adminService.getAdminById(id);
        return admin.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/get-requests/{id}")
    public List<Request> getRequests(@PathVariable Long id) throws Exception{

        try {
            Optional<Admin> Optionaladmin = adminService.getAdminById(id);
            if(Optionaladmin.isPresent()) {
                Admin admin = Optionaladmin.get();
                return adminService.getRequests(id);
            }
            throw new RuntimeException("Request not found");
            
        } catch (Exception e) {
            throw new Exception("Error Getting Requests",e);
        }
    }

    @PostMapping
    public Admin createAdmin(@RequestBody Admin admin) {
        return adminService.createAdmin(admin);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Admin> updateAdmin(@PathVariable Long id, @RequestBody Admin updatedAdmin) {
        Optional<Admin> updated = Optional.ofNullable(adminService.updateAdmin(id, updatedAdmin));
        return updated.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Long id) {
        if (adminService.getAdminById(id).isPresent()) {
            adminService.deleteAdmin(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
