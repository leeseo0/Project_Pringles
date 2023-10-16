package project.finalpj.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Schedule {   // 만든 일정 저장

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long schedule_id;

    private String title;   // 일정 제목

    private Integer days;   // 일정 일수 (종료일-시작일)

    @DateTimeFormat(pattern = "YYYY-MM-DD")
    @Column(name = "startdate")
    private LocalDate startDate;

    @DateTimeFormat(pattern = "YYYY-MM-DD")
    @Column(name = "enddate")
    private LocalDate endDate;

    @Column(columnDefinition = "TEXT")
    private String accommodation;   // 선택한 숙소

    private String recommendYN;   // 일정 추천 여부

    @Column(name = "priceweight")
    private Double priceWeight;   // 가격 가중치

    @Column(name = "ratingweight")
    private Double ratingWeight;   // 별점 가중치

    @Column(name = "reviewweight")
    private Double reviewWeight;   // 리뷰 가중치

    @Column(columnDefinition = "TEXT")
    private String sights;   // 선택한 관광지

    private String transportation;   // 선택한 교통수단

    @ManyToOne
    private Member member;   // member : schedule = 1:n
}
