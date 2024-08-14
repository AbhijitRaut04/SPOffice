package com.Backend.Service;

import com.Backend.Dto.AvailablePoliceUpdateDto;
import com.Backend.Entities.AvailablePolice;
import com.Backend.Entities.Patrolling;
import com.Backend.Entities.Police;
// import com.Backend.Entities.Subadmin;
import com.Backend.Repository.AvailablePoliceRepository;
import com.Backend.Repository.PatrollingRepository;
// import com.Backend.Repository.SubadminRepository;
import com.Backend.Repository.PoliceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AvailablePoliceService {

    private final AvailablePoliceRepository availablePoliceRepository;
    private final PatrollingRepository patrollingRepository;
    private final PoliceRepository policeRepository;
    // private final SubadminRepository subadminRepository;

    @Autowired
    public AvailablePoliceService(AvailablePoliceRepository availablePoliceRepository,
            PoliceRepository policeRepository,
            PatrollingRepository patrollingRepository) {
        this.availablePoliceRepository = availablePoliceRepository;
        this.policeRepository = policeRepository;
        this.patrollingRepository = patrollingRepository;
        // this.subadminRepository = subadminRepository;
    }

    public List<AvailablePolice> getAllAvailablePolices() {
        try {
            return availablePoliceRepository.findAll();
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
        return new ArrayList<>();
    }

    public Optional<AvailablePolice> getAvailablePoliceById(Long id) {
        try {
            return availablePoliceRepository.findById(id);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Map<String, Object>> getAvailablePoliceByEventId(Long eventId) {
        List<Object[]> results = availablePoliceRepository.findAvailablePoliceByEventId(eventId);
        List<Map<String, Object>> mappedResults = new ArrayList<>();

        for (Object[] result : results) {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("availableId", result[0]);
            map.put("policeId", result[1]);
            map.put("fullname", result[2]);
            map.put("designation", result[3]);
            map.put("subadmin_id", result[4]);
            map.put("gender", result[5]);
            map.put("phone", result[6]);
            mappedResults.add(map);
        }

        return mappedResults;
    }

    public AvailablePolice createAvailablePolice(AvailablePolice availablePolice, Long eventID, Long policeID,
            Long subadminID) {
        try {
            Patrolling event = patrollingRepository.findById(eventID)
                    .orElseThrow(() -> new IllegalArgumentException("Event not found with id: " + eventID));
            Police police = policeRepository.findById(policeID)
                    .orElseThrow(() -> new IllegalArgumentException("Police not found with id: " + policeID));
            // Subadmin subadmin = subadminRepository.findById(subadminID)
            // .orElseThrow(() -> new IllegalArgumentException("Subadmin not found with id:
            // " + subadminID));
            // availablePolice.setSubadmin(subadmin);
            // availablePolice.setEvent(event);
            availablePolice.setPolice(police);
            return availablePoliceRepository.save(availablePolice);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
        return null;
    }

    public boolean deleteAvailablePolice(Long id) {
        try {
            availablePoliceRepository.deleteById(id);
            return true;
        } catch (DataAccessException e) {
            throw new RuntimeException("Failed to delete available Police", e);
        }
    }

    public AvailablePolice updateAvailablePolice(Long id, AvailablePoliceUpdateDto updateDTO) {
        // Find the existing entry
        AvailablePolice existingEntry = availablePoliceRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("AvailablePolice not found with id " + id));

        if (updateDTO.getEventId() != null) {
            Patrolling event = patrollingRepository.findById(updateDTO.getEventId())
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Patrolling not found with id " + updateDTO.getEventId()));
            // existingEntry.setEvent(event);
        }
        if (updateDTO.getPoliceId() != null) {
            Police police = policeRepository.findById(updateDTO.getPoliceId())
                    .orElseThrow(
                            () -> new IllegalArgumentException("Police not found with id " + updateDTO.getPoliceId()));
            existingEntry.setPolice(police);
        }
        // if (updateDTO.getSubadminId() != null) {
        // Subadmin subadmin = subadminRepository.findById(updateDTO.getSubadminId())
        // .orElseThrow(() -> new IllegalArgumentException("Subadmin not found with id "
        // + updateDTO.getSubadminId()));
        // existingEntry.setSubadmin(subadmin);
        // }
        return availablePoliceRepository.save(existingEntry);
    }
}
