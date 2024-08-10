package com.Backend.Entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "subadmins")
@Getter
@Setter
public class Subadmin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String contact;

    @Column(nullable = false)
    private String station;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id", nullable = false)
    @JsonIgnore
    private Admin admin;

    @OneToMany(mappedBy = "subadmin", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Police> polices;
    @OneToMany(mappedBy = "subadmin", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AvailablePolice> available_polices;

}
