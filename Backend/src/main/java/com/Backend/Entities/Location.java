package com.Backend.Entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "locations")
@Getter
@Setter
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @ManyToOne
    @JoinColumn(name = "police_id")
    @JsonIgnore
    private Police head;

    @Column
    private List<String> malePolices;

    @Column
    private List<String> femalePolices;

    @Column
    private List<String> equipments;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sector_id")
    @JsonIgnore
    private Sector sector;

    @ElementCollection
    @CollectionTable(name = "policeAtLocation", joinColumns = @JoinColumn(name = "location_id"))
    @Column(name = "police")
    private Set<Police> polices = new HashSet<>();

}
