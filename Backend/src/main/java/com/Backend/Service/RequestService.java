package com.Backend.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.Backend.Entities.Request;
import com.Backend.Repository.RequestRepository;

@Service
public class RequestService {

    @Autowired
    private RequestRepository requestRepository;

    // Get all Requests
    public List<Request> getAllRequests() {
        try {
            return requestRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error fetching all requests", e);
        }
    }

    // Get Request by id
    public Optional<Request> getRequestById(Long id) {
        try {
            return requestRepository.findById(id);
        } catch (DataAccessException e) {
            throw new RuntimeException("Failed to fetch request by ID", e);
        }
    }

    // Create a new Request
    public Request createRequest(Request request) {
        try {
            return requestRepository.save(request);
        } catch (Exception e) {
            throw new RuntimeException("Error creating reuqest", e);
        }
    }

    // Sets Request Status to NOT_APPROVED
    public Request setRequestToRejected(Long id) {
        try {
            Optional<Request> request = requestRepository.findById(id);
            if (request.isPresent()) {
                Request existingRequest = request.get();
                existingRequest.setStatus("NOT_APPROVED");
                return requestRepository.save(existingRequest);
            }
            throw new RuntimeException("Request not found");
        } catch (Exception e) {
            throw new RuntimeException("Error updating request", e);
        }
    }

    // Set Request status to PENDING
    public Request setRequestToPending(Long id) {
        try {
            Optional<Request> request = requestRepository.findById(id);
            if (request.isPresent()) {
                Request existingRequest = request.get();
                existingRequest.setStatus("PENDING");
                return requestRepository.save(existingRequest);
            }
            throw new RuntimeException("Request not found");
        } catch (Exception e) {
            throw new RuntimeException("Error updating request", e);
        }
    }

    // Set Request status to APPROVED
    public Request setRequestToApproved(Long id) {
        try {
            Optional<Request> request = requestRepository.findById(id);
            if (request.isPresent()) {
                Request existingRequest = request.get();
                existingRequest.setStatus("APPROVED");
                return requestRepository.save(existingRequest);
            }
            throw new RuntimeException("Request not found");
        } catch (Exception e) {
            throw new RuntimeException("Error updating request", e);
        }
    }

    // Delete Request
    public boolean deleteRequest(Long id) {
        try {
            Optional<Request> request = requestRepository.findById(id);
            if (request.isPresent()) {
                requestRepository.delete(request.get());
                return true;
            }
            return false;
        } catch (Exception e) {
            throw new RuntimeException("Error deleting request", e);
        }
    }

}
