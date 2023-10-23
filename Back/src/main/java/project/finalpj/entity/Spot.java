package project.finalpj.entity;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "planspot")
@ToString
public class Spot {   // 일정 만들기 페이지에서 조회할 관광지 목록

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long spotid;

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
    private double ratingscore;
    private double reviewscore;
    private double pricescore;
    private String theme;
    private int themenum;
    private String firstimage;
    private double latitude;
    private double longitude;
}
