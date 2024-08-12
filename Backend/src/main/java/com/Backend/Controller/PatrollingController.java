package com.Backend.Controller;

import java.util.List;
import java.util.Optional;

import com.Backend.Dto.PatrollingDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Backend.Entities.Patrolling;
import com.Backend.Service.PatrollingService;

@RestController
@RequestMapping("/api/patrollings")
public class PatrollingController {

    @Autowired
    private PatrollingService patrollingService;

    // Get all Patrollings
    @GetMapping
    public ResponseEntity<List<Patrolling>> getAllPatrollings() {
        try {
            List<Patrolling> patrollings = patrollingService.getAllPatrollings();
            return ResponseEntity.ok(patrollings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get Patrolling by ID
    @GetMapping("/{id}")
    public ResponseEntity<Patrolling> getPatrollingById(@PathVariable Long id) {
        try {
            Optional<Patrolling> patrolling = patrollingService.getPatrollingById(id);
            return patrolling.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Create a new Patrolling
    @PostMapping
    public ResponseEntity<Patrolling> createPatrolling(@RequestBody PatrollingDto patrollingDTO) {
        try {
            Patrolling patrolling = patrollingService.createPatrolling(patrollingDTO);
            return ResponseEntity.ok(patrolling);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Update Patrolling
    @PutMapping("/{id}")
    public ResponseEntity<Patrolling> updatePatrolling(@PathVariable Long id, @RequestBody PatrollingDto patrollingDTO) {
        try {
            Patrolling patrolling = patrollingService.updatePatrolling(id, patrollingDTO);
            return ResponseEntity.ok(patrolling);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Delete Patrolling
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatrolling(@PathVariable Long id) {
        try {
            boolean deleted = patrollingService.deletePatrolling(id);
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
