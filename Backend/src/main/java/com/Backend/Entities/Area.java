package com.Backend.Entities;

import java.util.Set;

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
    private Police head;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subPatrolling_id")
    private SubPatrolling subPatrolling;

    @OneToMany(mappedBy = "area", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Sector> sectors;

}
