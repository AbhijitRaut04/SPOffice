package com.Backend.Dto;

import java.util.Date;
import java.util.Map;
import java.util.Set;

import com.Backend.Entities.Patrolling;
import com.Backend.Entities.Police;
import com.Backend.Entities.SubPatrolling;

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
        private Police head;
        private Police cohead;
        private Date date;
        private String eventname;
        private String description;
        private Set<SubPatrolling> subpatrollings;
        private Map<Long, Set<PoliceDto>> attendance;

        public PatrollingDto buildPatrolling(Patrolling patrolling, Map<Long, Set<PoliceDto>> attendance) {
                PatrollingDto patrollingDto = PatrollingDto.builder()
                                .id(patrolling.getId())
                                .adminId(patrolling.getAdmin().getId())
                                .head(patrolling.getHead())
                                .cohead(patrolling.getCohead())
                                .date(patrolling.getDate())
                                .eventname(patrolling.getEventname())
                                .description(patrolling.getDescription())
                                .attendance(attendance)
                                .subpatrollings(patrolling.getSubPatrollings())
                                .build();
                return patrollingDto;
        }
}
