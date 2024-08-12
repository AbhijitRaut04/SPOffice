package com.Backend.Entities;

// import java.util.List;
import java.util.Set;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "admins")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String password;

    private String contact;

    private String district;

    // @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL, orphanRemoval = true)
    // private List<Request> subAdminRequests;

    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Subadmin> subadmins;

    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Patrolling> patrollings;


}
