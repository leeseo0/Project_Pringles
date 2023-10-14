package project.finalpj.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.finalpj.DTO.ScheduleDTO;
import project.finalpj.entity.Member;
import project.finalpj.entity.Schedule;
import project.finalpj.repository.MemberRepository;
import project.finalpj.repository.ScheduleRepository;
import project.finalpj.service.ScheduleService;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ScheduleController {

    private final MemberRepository memberRepository;
    private final ScheduleRepository scheduleRepository;
    private final ScheduleService scheduleService;

    @Autowired
    public ScheduleController(MemberRepository memberRepository, ScheduleRepository scheduleRepository, ScheduleService scheduleService) {
        this.memberRepository = memberRepository;
        this.scheduleRepository = scheduleRepository;
        this.scheduleService = scheduleService;
    }

    // 일정 만들기 DB 저장
    @PostMapping(value = "/createplan/schedule/{userid}")
    public ResponseEntity<String> scheduleSubmit(@PathVariable("userid") String userid, @RequestBody ScheduleDTO scheduleDTO) {
        System.out.println("들어와주라");

        // startDate 값 없으면 badRequest 응답 반환
        if (scheduleDTO.getStartDate() == null) {
            return ResponseEntity.badRequest().body("startDate 값 없음");
        }

        Member member = this.memberRepository.getReferenceById(userid);
        Schedule schedule = new Schedule();

//            // 변환 코드 추가
//            String startDateStr = map.get("startdate");
//            String endDateStr = map.get("enddate");
//            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//            LocalDate startDate = LocalDate.parse(startDateStr, formatter);
//            LocalDate endDate = LocalDate.parse(endDateStr, formatter);
//            Double priceweight = Double.parseDouble(map.get("priceweight"));
//            Double ratingweight = Double.parseDouble(map.get("ratingweight"));
//            Double reviewweight = Double.parseDouble(map.get("reviewweight"));

//            schedule.setStartDate(startDate);
//            schedule.setEndDate(endDate);
//            schedule.setAccommodation(map.get("accommodation"));
//            schedule.setRecommendYN(map.get("recommendyn"));
//            schedule.setPriceWeight(priceweight);
//            schedule.setRatingWeight(ratingweight);
//            schedule.setReviewWeight(reviewweight);
//            schedule.setSights(map.get("sights"));
//            schedule.setTransportation(map.get("transportation"));
//            schedule.setMember(member);
//            scheduleRepository.save(schedule);

        String startDateStr = scheduleDTO.getStartDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        String endDateStr = scheduleDTO.getEndDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        schedule.setTitle(scheduleDTO.getTitle());
        schedule.setStartDate(LocalDate.parse(startDateStr));
        schedule.setEndDate(LocalDate.parse(endDateStr));
//        schedule.setStartDate(scheduleDTO.getStartDate());
//        schedule.setEndDate(scheduleDTO.getEndDate());
        schedule.setAccommodation(scheduleDTO.getAccommodation());
        schedule.setRecommendYN(scheduleDTO.getRecommendYN());
        schedule.setPriceWeight(scheduleDTO.getPriceWeight());
        schedule.setRatingWeight(scheduleDTO.getRatingWeight());
        schedule.setReviewWeight(scheduleDTO.getReviewWeight());
        schedule.setSights(scheduleDTO.getSights());
        schedule.setTransportation(scheduleDTO.getTransportation());
        schedule.setMember(member);
        scheduleRepository.save(schedule);

        return ResponseEntity.ok("일정 저장 성공");
    }

    // 생성된 일정 리스트 호출
    @GetMapping("/mypage/planlist")
    public List<ScheduleDTO> getScheduleList() {
        List<Schedule> schedules = scheduleRepository.findAll();
        return schedules.stream().map(ScheduleDTO::fromSchedule).collect(Collectors.toList());
    }
//    public ResponseEntity<List<Schedule>> getAllSchedules() {
//        List<Schedule> schedules = scheduleService.getAllSchedules();
//        return ResponseEntity.ok(schedules);
//    }

    // 일정 상세 페이지
    @GetMapping(value = "/mypage/planlist/{schedule_id}")
    public ResponseEntity<?> getScheduleDetail(@PathVariable("schedule_id") Long schedule_id) {
        System.out.println("들어오나용");
        Optional<Schedule> scheduleOptional = scheduleRepository.findById(schedule_id);

        if (scheduleOptional.isPresent()) {
            ScheduleDTO scheduleDTO = ScheduleDTO.fromSchedule(scheduleOptional.get());
            return ResponseEntity.ok(scheduleDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("일정을 찾을 수 없습니다");
        }
    }

    // 일정 삭제
    @DeleteMapping(value = "/mypage/planlist/plan-delete/{schedule_id}")
    public String planDelete(@PathVariable("schedule_id") Long schedule_id) {
        System.out.println(schedule_id);
        Optional<Schedule> schedule = this.scheduleRepository.findById(schedule_id);
        if (schedule.isPresent()) {
            Schedule s = schedule.get();
            scheduleRepository.delete(s);
            return null;
        } else {
            return "not delete";
        }
    }
}
