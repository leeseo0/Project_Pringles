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
        // 값이 들어오는지 확인
        System.out.println("들어와주라");
        System.out.println(scheduleDTO.getStartDate());
        System.out.println(scheduleDTO.getEndDate());
        System.out.println(scheduleDTO.getDays());
        System.out.println(scheduleDTO.getAccommodation());
        System.out.println(scheduleDTO.getRecommendYN());
        System.out.println(scheduleDTO.getSights());
        System.out.println(scheduleDTO.getPriceWeight());
        System.out.println(scheduleDTO.getTransportation());
        System.out.println(scheduleDTO.getTitle());
        System.out.println(scheduleDTO);

//        // startDate 값 없으면 badRequest 응답 반환
//        if (scheduleDTO.getStartDate() == null) {
//            return ResponseEntity.badRequest().body("startDate 값 없음");
//        }

        Member member = this.memberRepository.getReferenceById(userid);
        Schedule schedule = new Schedule();

        schedule.setTitle(scheduleDTO.getTitle());
        schedule.setStartDate(scheduleDTO.getStartDate());
        schedule.setEndDate(scheduleDTO.getEndDate());
        schedule.setDays(scheduleDTO.getDays());
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
    @GetMapping("/mypage/planlist/{userid}")
    public List<ScheduleDTO> getScheduleList(@PathVariable("userid") String userid) {
        System.out.println("전달되는거니");
        List<Schedule> schedules = scheduleRepository.findByMemberUserid(userid);
        return schedules.stream().map(ScheduleDTO::fromSchedule).collect(Collectors.toList());
    }
//    public ResponseEntity<List<Schedule>> getAllSchedules() {
//        List<Schedule> schedules = scheduleService.getAllSchedules();
//        return ResponseEntity.ok(schedules);
//    }

    // 일정 상세 페이지
    @GetMapping(value = "/mypage/planlist/plan/{schedule_id}")
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
