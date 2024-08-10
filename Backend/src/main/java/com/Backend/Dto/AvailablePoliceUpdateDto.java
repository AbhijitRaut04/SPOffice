package com.Backend.Dto;

import lombok.Getter;
import lombok.Setter;

// This is a data transfer object for Updating Available Police
@Getter
@Setter
public class AvailablePoliceUpdateDto {
    private Long eventId;
    private Long policeId;
    private Long subadminId;
}
