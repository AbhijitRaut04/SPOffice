package com.Backend.Controller;

import com.Backend.Entities.Subadmin;
import com.Backend.Service.SubadminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/subadmins")
public class SubadminController extends BaseController  {

    @Autowired
    private SubadminService subadminService;


    // Get all Subadmins
    @GetMapping
    public ResponseEntity<List<Subadmin>> getAllSubadmins() {
        try {
            List<Subadmin> subadmins = subadminService.getAllSubadmins();
            return ResponseEntity.ok(subadmins);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get Subadmins for admin
    @GetMapping("/requests/{admin_id}")
    public ResponseEntity<List<Subadmin>> getSubadminsByAdminId(@PathVariable Long admin_id) {
        try {
            List<Subadmin> subadmins = subadminService.getSubadminsByAdminID(admin_id);
            return ResponseEntity.ok(subadmins);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get approved Subadmins for admin
    @GetMapping("/approved/{admin_id}")
    public ResponseEntity<List<Subadmin>> getApprovedSubadminsByAdminId(@PathVariable Long admin_id) {
        try {
            List<Subadmin> subadmins = subadminService.getApprovedSubadminsByAdminID(admin_id);
            return ResponseEntity.ok(subadmins);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // unapprove subadmin
    @PutMapping("/requests/reject/{subadmin_id}")
    public ResponseEntity<Subadmin> rejectRequest(@PathVariable Long subadmin_id) {
        Optional<Subadmin> updated = Optional.ofNullable(subadminService.setStatusToRejected(subadmin_id));
        return updated.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // approve subadmin
    @PutMapping("/requests/approve/{subadmin_id}")
    public ResponseEntity<Subadmin> qpproveRequest(@PathVariable Long subadmin_id) {
        Optional<Subadmin> updated = Optional.ofNullable(subadminService.setStatusToApproved(subadmin_id));
        return updated.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get Subadmin by ID
    @GetMapping("/{id}")
    public ResponseEntity<Subadmin> getSubadminById(@PathVariable Long id) {
        try {
            Optional<Subadmin> subadmin = subadminService.getSubadminById(id);
            return subadmin.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Create a new Subadmin
    @PostMapping
    public ResponseEntity<Subadmin> createSubadmin(
            @RequestParam Long admin_id,
            @RequestBody Subadmin subadmin) {

        try {
            // Create Subadmin with the given adminId
            Subadmin createdSubadmin = subadminService.createSubadmin(subadmin, admin_id);
            return ResponseEntity.ok(createdSubadmin);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Update Subadmin
    @PutMapping("/{id}")
    public ResponseEntity<Subadmin> updateSubadmin(@PathVariable Long id, @RequestBody Subadmin subadminDetails) {
        try {
            Subadmin updatedSubadmin = subadminService.updateSubadmin(id, subadminDetails);
            return new ResponseEntity<>(updatedSubadmin, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Delete Subadmin
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubadmin(@PathVariable Long id) {
        try {
            boolean deleted = subadminService.deleteSubadmin(id);
            if (deleted) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
