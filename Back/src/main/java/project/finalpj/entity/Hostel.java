package project.finalpj.entity;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "planhostel")
@ToString
public class Hostel {   // 일정 만들기 페이지에서 조회할 숙소 목록

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hostelid;

    @Column
    private String name;
    private String type;
    private String address1;
    private String address2;
    private String tel;
    private String homepage;
    private String checktime;
    private String petinfo;
    private String placeinfo;
    private double rating;
    private int review;
    private String theme;
    private int themenum;
    private String firstimage;
    private double latitude;
    private double longitude;
}
