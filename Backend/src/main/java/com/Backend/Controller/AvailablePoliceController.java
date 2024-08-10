package com.Backend.Controller;

import com.Backend.Dto.AvailablePoliceUpdateDto;
import com.Backend.Entities.AvailablePolice;
import com.Backend.Entities.Subadmin;
import com.Backend.Service.AvailablePoliceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/availablepolice")
public class AvailablePoliceController {
    @Autowired
    private AvailablePoliceService availablePoliceService;

    // Get all Available Police
    @GetMapping
    public ResponseEntity<List<AvailablePolice>> getAllAvailablePolice() {
        try {
            List<AvailablePolice> availablePolices = availablePoliceService.getAllAvailablePolices();
            return ResponseEntity.ok(availablePolices);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get Available Police by ID
    @GetMapping("/{id}")
    public ResponseEntity<AvailablePolice> getAvailablePoliceById(@PathVariable Long id) {
        try {
            Optional<AvailablePolice> availablePolice = availablePoliceService.getAvailablePoliceById(id);
            return availablePolice.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get available police for an event
    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<Map<String, Object>>> getAvailablePolice(@PathVariable Long eventId) {
        List<Map<String, Object>> availablePolice = availablePoliceService.getAvailablePoliceByEventId(eventId);
        return new ResponseEntity<>(availablePolice, HttpStatus.OK);
    }

    // Create a new Available Police
    @PostMapping
    public ResponseEntity<AvailablePolice> createAvailablePolice(
            @RequestParam Long subadmin_id,
            @RequestParam Long police_id,
            @RequestParam Long event_id,
            @RequestBody AvailablePolice availablePolice) {

        try {
            // Add police to available list for particular event
            AvailablePolice createdAvailalbePolice = availablePoliceService.createAvailablePolice(availablePolice,event_id,police_id, subadmin_id);
            return ResponseEntity.ok(createdAvailalbePolice);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    // Update Available Police
    @PutMapping("/{id}")

    public ResponseEntity<AvailablePolice> updateAvailablePolice(@PathVariable Long id,@RequestBody AvailablePoliceUpdateDto updateDTO){
        try {
            AvailablePolice updatedAvailablePolice = availablePoliceService.updateAvailablePolice(id,updateDTO);
            return new ResponseEntity<>(updatedAvailablePolice, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    // Remove a police from available list for a particular event (After he is alloted to an event patrolling)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubadmin(@PathVariable Long id) {
        try {
            boolean deleted = availablePoliceService.deleteAvailablePolice(id);
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
