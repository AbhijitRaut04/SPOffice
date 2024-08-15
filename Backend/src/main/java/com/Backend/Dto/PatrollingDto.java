package com.Backend.Dto;
import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatrollingDto {

        private Long id;
        private Long adminId;
        private Long headId;
        private Date date;
        private String eventname;
        private String description;
        private Long attendanceId;
}


