package project.finalpj.entity;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "jeju_hostel")
@ToString
public class Hostel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hostel_id;

    @Column
    private String name;
    private String type;
    private String address1;
    private String address2;
    private String tel;
    private String homepage;
    private String checktime;
    private double rating;
    private int review;
    private double latitude;
    private double longitude;
    private String theme;
    private int themenum;
    private String firstimage;
    private String secondimage;
}
