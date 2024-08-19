package com.Backend.Controller;

import com.Backend.Dto.LoginRequest;
import com.Backend.Dto.SubadminDto;
import com.Backend.Entities.Subadmin;
import com.Backend.Service.SubadminService;
import com.Backend.Utils.JwtUtil;
import com.Backend.Utils.PasswordChecker;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/subadmins")
public class SubadminController extends BaseController  {

    @Autowired
    private SubadminService subadminService;
    private final JwtUtil jwtUtil;
    @Autowired
    private final PasswordChecker passwordChecker;

    public SubadminController(PasswordChecker passwordChecker, JwtUtil jwtUtil){
        this.passwordChecker = passwordChecker;
        this.jwtUtil = jwtUtil;

    }


    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {

        Optional<Subadmin> subadminOptional = subadminService.getSubdminByUsername(loginRequest.getUsername());
        if (subadminOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("error", "Subadmin not found."));
        }

        Subadmin subadmin = subadminOptional.get();

        if (!passwordChecker.checkPassword(loginRequest.getPassword(), subadmin.getPassword())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Collections.singletonMap("error", "Invalid Credentials"));
        }

        final UserDetails userDetails = new User(subadmin.getUsername(), subadmin.getPassword(), Collections.emptyList());
        final String jwt = jwtUtil.generateToken(userDetails.getUsername()).toString();

        Cookie jwtCookie = new Cookie("jwtToken", jwt);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(true);
        jwtCookie.setPath("/");
        response.addCookie(jwtCookie);
        Map<String, String> map = new HashMap<String, String>();
        map.put("jwtToken", jwt);
        return ResponseEntity.ok(map);
    }


    // Get Subadmins for admin
    @GetMapping("/requests/{admin_id}")
    public ResponseEntity<Set<SubadminDto>> getSubadminsByAdminId(@PathVariable Long admin_id) {
        try {

            Set<SubadminDto> subadmins = subadminService.getSubadminsByAdminID(admin_id);
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
    public ResponseEntity<SubadminDto> getSubadminById(@PathVariable Long id) {
        try {
            SubadminDto subadmin = subadminService.getSubadminById(id);
            return ResponseEntity.ok(subadmin);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Create a new Subadmin
    @PostMapping
    public ResponseEntity<Subadmin> createSubadmin(
            @RequestParam Long admin_id,
            @RequestBody Subadmin subadmin) {
        System.out.println("___________________________________________");
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
