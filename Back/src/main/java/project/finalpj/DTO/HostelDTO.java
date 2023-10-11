package project.finalpj.DTO;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class HostelDTO {
    private Long hostel_id;
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
