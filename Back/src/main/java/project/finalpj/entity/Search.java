package project.finalpj.entity;

import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "jeju_all")
public class Search {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer sight_id;

    @Column
    private String name;

    @Column
    private String type;

    @Column
    private String address1;

    @Column
    private String address2;

    @Column
    private String tel;

    @Column
    private String placetime;

    @Column
    private Double rating;

    @Column
    private Integer review;

    @Column
    private String price;

    @Column
    private String median;

    @Column
    private Integer medianprice;

    @Column
    private Double latitude;

    @Column
    private Double longitude;

    @Column
    private String newtype;

    @Column
    private String theme;

    @Column
    private Integer themenum;

    @Column
    private String firstimage;

    @Column
    private String secondimage;
}
