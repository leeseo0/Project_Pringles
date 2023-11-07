package project.finalpj.DTO;

import lombok.Getter;
import lombok.Setter;
import project.finalpj.entity.Member;
import project.finalpj.entity.Schedule;
import project.finalpj.entity.SharePost;

import java.time.LocalDate;

@Getter
@Setter
public class SharePostDTO {
    private Long post_id;
    private String userid;   // Member 엔티티와 연결
    private Long schedule_id;   // Schedule 엔티티와 연결
    private String title;
    private Integer days;
    private LocalDate startDate;
    private LocalDate endDate;
    private String accommodation;
    private String sights;
    private String transportation;

    public static SharePostDTO fromSharePost(SharePost sharePost) {
        SharePostDTO sharePostDTO = new SharePostDTO();
        sharePostDTO.setPost_id(sharePost.getPost_id());

        // Member 엔티티에서 userid
        Member member = sharePost.getMember();
        if (member != null) {
            sharePostDTO.setUserid(member.getUserid());
        }

        // schedule 엔티티에서 나머지 값
        Schedule schedule = sharePost.getSchedule();
        if (schedule != null) {
            sharePostDTO.setSchedule_id(schedule.getSchedule_id());
            sharePostDTO.setTitle(schedule.getTitle());
            sharePostDTO.setDays(schedule.getDays());
            sharePostDTO.setStartDate(schedule.getStartDate());
            sharePostDTO.setEndDate(schedule.getEndDate());
            sharePostDTO.setAccommodation(schedule.getAccommodation());
            sharePostDTO.setSights(schedule.getSights());
            sharePostDTO.setTransportation(schedule.getTransportation());
        }

        return sharePostDTO;
    }
}
