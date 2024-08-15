package com.Backend.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "available_police")
@Getter
@Setter

public class AvailablePolice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long available_id;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "event_id", nullable = false)
    // @JsonIgnore
    // private Patrolling event;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "police_id", nullable = false)
    @JsonIgnore
    private Police police;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "subadmin_id", nullable = false)
    // @JsonIgnore
    // private Subadmin subadmin;

}
