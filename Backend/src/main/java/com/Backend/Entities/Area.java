package com.Backend.Entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "areas")
@Getter
@Setter
public class Area {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String areaName;

    @OneToOne(mappedBy = "area")
    @JsonIgnore
    private Police head;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subPatrolling_id")
    @JsonIgnore
    private SubPatrolling subPatrolling;

    @OneToMany(mappedBy = "area", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Sector> sectors;

}
