// package com.Backend.Entities;

// import com.fasterxml.jackson.annotation.JsonIgnore;

// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;
// import jakarta.persistence.OneToOne;
// import jakarta.persistence.Table;
// import lombok.Getter;
// import lombok.Setter;

// @Entity
// @Table(name = "requests")
// @Getter
// @Setter
// public class Request {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;
    
//     @ManyToOne
//     @JoinColumn(name = "admin_id")
//     @JsonIgnore
//     private Admin admin;

//     @OneToOne
//     @JoinColumn(name = "subadmin_id")
//     private Subadmin subadmin;

//     @Column
//     private String status = "NOT_APPROVED";

// }
