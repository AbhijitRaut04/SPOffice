package com.Backend.Service;

import com.Backend.Entities.Location;
import com.Backend.Repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    public Optional<Location> getLocationById(Long id) {
        return locationRepository.findById(id);
    }

    public Location createLocation(Location location) {
        return locationRepository.save(location);
    }

    public Location updateLocation(Long id, Location updatedLocation) {
        try {
            return locationRepository.findById(id)
                .map(location -> {
                    location.setName(updatedLocation.getName());
                    location.setHead(updatedLocation.getHead());
                    location.setMalePolices(updatedLocation.getMalePolices());
                    location.setFemalePolices(updatedLocation.getFemalePolices());
                    location.setEquipments(updatedLocation.getEquipments());
                    location.setSector(updatedLocation.getSector());
                    // location.setPolices(updatedLocation.getPolices());
                    return locationRepository.save(location);
                })
                .orElseGet(() -> {
                    updatedLocation.setId(id);
                    return locationRepository.save(updatedLocation);
                });
        } catch (DataAccessException e) {
            throw new RuntimeException("Failed to update location", e);
        }
    }

    public boolean deleteLocation(Long id) {
        if (locationRepository.existsById(id)) {
            locationRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
