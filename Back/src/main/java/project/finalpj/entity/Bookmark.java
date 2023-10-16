//package com.example.demo.Entity;
//
//import lombok.Getter;
//import lombok.Setter;
//
//import javax.persistence.*;
//
//@Entity
//@Getter
//@Setter
//@Table(name="bookmark")
//public class Bookmark {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    private Long id;
//
//    @Column
//    private String userId;
//    @Column
//    private String sightName;
//
//    @Column
//    private float rating;
//    private float review;
//    private String theme;
//    private String firstimage;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "userId", referencedColumnName = "userid")
//    private Member member; //user:bookmark = 1:n
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "sightName", referencedColumnName = "name")
//    private Sight sight;
//
//}
