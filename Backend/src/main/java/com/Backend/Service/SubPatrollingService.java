package com.Backend.Service;

import com.Backend.Dto.SubPatrollingDto;
import com.Backend.Entities.Patrolling;
import com.Backend.Entities.Police;
import com.Backend.Entities.SubPatrolling;
import com.Backend.Repository.PatrollingRepository;
import com.Backend.Repository.PoliceRepository;
import com.Backend.Repository.SubPatrollingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubPatrollingService {

    @Autowired
    private SubPatrollingRepository subPatrollingRepository;
    @Autowired
    private PoliceRepository policeRepository;
    @Autowired
    private PatrollingRepository patrollingRepository;

    // Get all SubPatrollings
    public List<SubPatrolling> getAllSubPatrollings() {
        return subPatrollingRepository.findAll();
    }

    // Get SubPatrolling by ID
    public Optional<SubPatrolling> getSubPatrollingById(Long id) {
        return subPatrollingRepository.findById(id);
    }

    // Create a new SubPatrolling
    public SubPatrolling createSubPatrolling(SubPatrollingDto subPatrollingDTO) {
        try {
            SubPatrolling subPatrolling = new SubPatrolling();

            Police head = policeRepository.findById(subPatrollingDTO.getHeadId())
                    .orElseThrow(() -> new RuntimeException("Head not found"));
            Police cohead = policeRepository.findById(subPatrollingDTO.getCoheadId())
                    .orElseThrow(() -> new RuntimeException("Co-head not found"));
            Patrolling patrolling = patrollingRepository.findById(subPatrollingDTO.getPatrollingId())
                    .orElseThrow(() -> new RuntimeException("Patrolling not found"));

            subPatrolling.setHead(head);
            subPatrolling.setCohead(cohead);
            subPatrolling.setDescription(subPatrollingDTO.getDescription());
            subPatrolling.setInstructions(subPatrollingDTO.getInstructions());
            subPatrolling.setPatrolling(patrolling);
            return subPatrollingRepository.save(subPatrolling);
        } catch (DataAccessException e) {
            throw new RuntimeException("Failed to create SubPatrolling", e);
        }
    }

    // Update SubPatrolling
    public SubPatrolling updateSubPatrolling(Long id, SubPatrolling updatedSubPatrolling) {
        try {
            return subPatrollingRepository.findById(id)
                    .map(subPatrolling -> {
                        // Update fields
                        subPatrolling.setHead(updatedSubPatrolling.getHead());
                        subPatrolling.setCohead(updatedSubPatrolling.getCohead());
                        subPatrolling.setDescription(updatedSubPatrolling.getDescription());
                        subPatrolling.setInstructions(updatedSubPatrolling.getInstructions());
                        subPatrolling.setPatrolling(updatedSubPatrolling.getPatrolling());
                        subPatrolling.setAreas(updatedSubPatrolling.getAreas());

                        return subPatrollingRepository.save(subPatrolling);
                    })
                    .orElseGet(() -> {
                        updatedSubPatrolling.setId(id);
                        return subPatrollingRepository.save(updatedSubPatrolling);
                    });
        } catch (DataAccessException e) {
            throw new RuntimeException("Failed to update SubPatrolling", e);
        }
    }

    // Delete SubPatrolling
    public boolean deleteSubPatrolling(Long id) {
        try {
            if (subPatrollingRepository.existsById(id)) {
                subPatrollingRepository.deleteById(id);
                return true;
            } else {
                return false;
            }
        } catch (DataAccessException e) {
            throw new RuntimeException("Failed to delete SubPatrolling", e);
        }
    }
}
