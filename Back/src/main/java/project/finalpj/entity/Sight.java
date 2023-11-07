package project.finalpj.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "totalsight")
public class Sight {   // 관광지 상세페이지에 보여줄 관광지 목록

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sightid;

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
    private String theme;
    @Column
    private String firstimage;
    @Column
    private Double latitude;
    @Column
    private Double longitude;
    @Column
    private String petinfo;
    @Column
    private String placeinfo;
}