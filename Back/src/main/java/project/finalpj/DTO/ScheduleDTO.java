package project.finalpj.DTO;

import lombok.Getter;
import lombok.Setter;
import project.finalpj.entity.Member;
import project.finalpj.entity.Schedule;

import java.time.LocalDate;

@Getter
@Setter
public class ScheduleDTO {
    private Long schedule_id;
    private String userid;   // Member 엔티티랑 연결
    private String title;
    private Integer days;
    private LocalDate startDate;
    private LocalDate endDate;
    private String accommodation;
    private String recommendYN;
    private Double priceWeight;
    private Double ratingWeight;
    private Double reviewWeight;
    private String sights;
    private String transportation;
    private Integer shared;

    public static ScheduleDTO fromSchedule(Schedule schedule) {
        ScheduleDTO scheduleDTO = new ScheduleDTO();
        scheduleDTO.setSchedule_id(schedule.getSchedule_id());

        // Member 엔티티에서 userid 가져오기
        Member member = schedule.getMember();
        if (member != null) {
            scheduleDTO.setUserid(member.getUserid());
        }

        scheduleDTO.setTitle(schedule.getTitle());
        scheduleDTO.setDays(schedule.getDays());
        scheduleDTO.setStartDate(schedule.getStartDate());
        scheduleDTO.setEndDate(schedule.getEndDate());
        scheduleDTO.setAccommodation(schedule.getAccommodation());
        scheduleDTO.setRecommendYN(schedule.getRecommendYN());
        scheduleDTO.setPriceWeight(schedule.getPriceWeight());
        scheduleDTO.setRatingWeight(schedule.getRatingWeight());
        scheduleDTO.setReviewWeight(schedule.getReviewWeight());
        scheduleDTO.setSights(schedule.getSights());
        scheduleDTO.setTransportation(schedule.getTransportation());
        scheduleDTO.setShared(schedule.getShared());

        return scheduleDTO;
    }
}
