package com.Backend.Dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

import com.Backend.Entities.Police;

@Getter
@Setter
public class LocationDto {
    private Long id;
    private String locationName;
    private Long headId;
    private Long sectorId;
    private List<Police> polices;
    private List<String> equipments;
}
