package com.Backend.Dto;

import java.util.Date;
import java.util.Map;
import java.util.Set;

import com.Backend.Entities.Patrolling;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PatrollingDto {

        private Long id;
        private Long adminId;
        private Long headId;
        private Date date;
        private String eventname;
        private String description;
        private Map<Long, Set<PoliceDto>> attendance;

        public PatrollingDto buildPatrolling(Patrolling patrolling, Map<Long, Set<PoliceDto>> attendance) {
                PatrollingDto patrollingDto = PatrollingDto.builder()
                                .id(patrolling.getId())
                                .adminId(patrolling.getAdmin().getId())
                                .headId(patrolling.getHead().getId())
                                .date(patrolling.getDate())
                                .eventname(patrolling.getEventname())
                                .description(patrolling.getDescription())
                                .attendance(attendance)
                                .build();
                return patrollingDto;
        }
}
