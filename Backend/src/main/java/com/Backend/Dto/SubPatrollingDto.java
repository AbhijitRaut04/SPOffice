package com.Backend.Dto;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class SubPatrollingDto {
    private Long headId;
    private Long coheadId;
    private String description;
    private String instructions;
    private Long patrollingId;
}
