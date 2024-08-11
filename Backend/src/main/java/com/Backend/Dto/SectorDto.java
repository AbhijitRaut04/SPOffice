package com.Backend.Dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class SectorDto {
    private Long id;
    private String name;
    private Long headId;
    private Long areaId;
    private Set<Long> locationIds;
}
