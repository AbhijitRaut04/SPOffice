package com.Backend.Entities;

import java.util.Date;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "patrollings")
@Getter
@Setter
public class Patrolling {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id")
    @JsonIgnore
    private Admin admin;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "police_id")
    @JsonIgnore
    private Police head;

    @Column
    private Date date;

    @Column
    private String eventname;

    @Column
    private String description;

    @OneToMany(mappedBy = "patrolling", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<SubPatrolling> subPatrollings;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AvailablePolice> available_polices;
    

}
