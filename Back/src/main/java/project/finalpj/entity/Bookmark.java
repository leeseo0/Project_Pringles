package project.finalpj.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="bookmark")
public class Bookmark {   // 사용자가 찜 표시 누르면 저장될 북마크 목록

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookmark_id;

    @ManyToOne
    private Member member;   // member : bookmark = 1 : n

    @ManyToOne
    private Sight sight;

//    @Column
//    private double rating;
//    private int review;
//    private String theme;
//    private String firstimage;

    public String getSightName() {
        if (sight != null) {
            return sight.getName();
        } else {
            return null; // 또는 다른 기본값을 반환할 수 있습니다.
        }
    }
}
