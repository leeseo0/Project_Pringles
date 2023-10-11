package project.finalpj.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Schedule {   // 만든 일정 저장

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long schedule_id;

}
