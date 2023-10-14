package project.finalpj.entity;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "plansight")
@ToString
public class Spot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sightid;

    @Column
    private String name;
    private String type;
    private String address1;
    private String address2;
    private String tel;
    private String placetime;
    private double rating;
    private int review;
    private String medianprice;
    private String theme;
    private int themenum;
    private String firstimage;
    private double latitude;
    private double longitude;
}
