package com.Backend.Dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class LocationDto {
    private Long id;
    private String name;
    private Long headId;
    private Long sectorId;
    private List<String> malePolices;
    private List<String> femalePolices;
    private List<String> equipments;
}
