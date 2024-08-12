package com.Backend.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PoliceDto {
    private String fullname;
    private Long policeId;
    private String phone;
    private String email;
    private String gender;
    private String designation;
    private Long subadminId;
    private Long requestId;
    private Long areaId;
    private Long sectorId;
}
