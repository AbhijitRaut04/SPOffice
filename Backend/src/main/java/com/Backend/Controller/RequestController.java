package com.Backend.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Backend.Entities.Request;
import com.Backend.Service.RequestService;

@RestController
@RequestMapping("/api/requests")
public class RequestController extends BaseController  {

    private final RequestService requestService;

    

    @Autowired
    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    @GetMapping
    public List<Request> getAllRequests() {
        return requestService.getAllRequests();
    }

    @PostMapping
    public Request createRequest(@RequestBody Request request) {
        return requestService.createRequest(request);
    }

    @PutMapping("/reject-request/{request_id}")
    public ResponseEntity<Request> rejectRequest(@PathVariable Long request_id) {
        Optional<Request> updated = Optional.ofNullable(requestService.setRequestToRejected(request_id));
        return updated.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/pending-request/{request_id}")
    public ResponseEntity<Request> pendingRequest(@PathVariable Long request_id) {
        Optional<Request> updated = Optional.ofNullable(requestService.setRequestToPending(request_id));
        return updated.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/approve-request/{request_id}")
    public ResponseEntity<Request> approveRequest(@PathVariable Long request_id) {
        Optional<Request> updated = Optional.ofNullable(requestService.setRequestToApproved(request_id));
        
        return updated.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        if (requestService.getRequestById(id).isPresent()) {
            requestService.deleteRequest(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
