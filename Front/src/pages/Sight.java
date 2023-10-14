package project.finalpj.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "jeju_sight")
public class Sight {

    @Id
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
    private float rating;
    @Column
    private float review;
    @Column
    private String price;
    @Column
    private String median;
    @Column
    private String medianprice;
    @Column
    private float latitude;
    @Column
    private float longitude;

    @Column
    private String newtype;
    @Column
    private String theme;
    @Column
    private int themenum;
    @Column
    private String firstimage;
    @Column
    private String secondimage;
}
