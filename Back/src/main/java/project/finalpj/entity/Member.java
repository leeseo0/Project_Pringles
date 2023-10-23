package project.finalpj.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
public class Member { // 회원정보 저장 Entity


//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Integer seq;

    @Id
    @Column(unique = true)
    private String userid;

    @Column
    private String password;

    @Column
    private String username;

    @Column(unique = true)
    private String email;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)   // member:schedule = 1:n
    private List<Schedule> scheduleList;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)   // member:bookmark = 1:n
    private List<Bookmark> bookmarkList;
}
