package project.finalpj.DTO;

import lombok.Getter;
import lombok.Setter;
import project.finalpj.entity.Schedule;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class ScheduleDTO {
    private Long schedule_id;
    private String title;
    private LocalDate startDate;
    private LocalDate endDate;
    private List<String> accommodation;
    private String recommendYN;
    private Double priceWeight;
    private Double ratingWeight;
    private Double reviewWeight;
    private List<String> sights;
    private String transportation;

    public static ScheduleDTO fromSchedule(Schedule schedule) {
        ScheduleDTO scheduleDTO = new ScheduleDTO();
        scheduleDTO.setSchedule_id(schedule.getSchedule_id());
        scheduleDTO.setTitle(schedule.getTitle());
        scheduleDTO.setStartDate(schedule.getStartDate());
        scheduleDTO.setEndDate(schedule.getEndDate());
        scheduleDTO.setAccommodation(schedule.getAccommodation());
        scheduleDTO.setRecommendYN(schedule.getRecommendYN());
        scheduleDTO.setPriceWeight(schedule.getPriceWeight());
        scheduleDTO.setRatingWeight(schedule.getRatingWeight());
        scheduleDTO.setReviewWeight(schedule.getReviewWeight());
        scheduleDTO.setSights(schedule.getSights());
        scheduleDTO.setTransportation(schedule.getTransportation());

        return scheduleDTO;
    }
}
