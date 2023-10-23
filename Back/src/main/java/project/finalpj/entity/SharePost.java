package project.finalpj.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "sharepost")
public class SharePost {   // 사용자가 일정 공유를 진행하면 저장될 일정 번호 목록

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long post_id;

    @ManyToOne
    private Member member;

    @OneToOne
    private Schedule schedule;
}
