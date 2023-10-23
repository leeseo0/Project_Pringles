package project.finalpj.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import project.finalpj.entity.Member;
import project.finalpj.entity.Schedule;
import project.finalpj.entity.SharePost;
import project.finalpj.repository.ScheduleRepository;
import project.finalpj.repository.SharePostRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final SharePostRepository sharePostRepository;

//    // 일정 목록 조회
//    public List<Schedule> getAllSchedules() {
//        List<Schedule> schedules = scheduleRepository.findAll();
//        return schedules;
//    }

    // 일정 공유 상태 업데이트 및 공유 게시판 테이블에 추가
    public ResponseEntity<String> updateShareStatus(Long scheduleId, Integer shared) {
        Optional<Schedule> scheduleOptional = scheduleRepository.findById(scheduleId);

        if (scheduleOptional.isPresent()) {
            Schedule schedule = scheduleOptional.get();

            // 이전 공유 상태 가져오기
            Integer previousShared = schedule.getShared();

            // 공유 상태 업데이트
            schedule.setShared(shared);
            scheduleRepository.save(schedule);

            // 공유 상태 0으로 변경되고 이전 상태가 1인 경우 SharePost 테이블에서 제거
            if (previousShared == 1 & shared == 0) {
                SharePost sharePost = sharePostRepository.findBySchedule(schedule);
                if (sharePost != null) {
                    sharePostRepository.delete(sharePost);
                }

            } else if (shared == 1) {
//            // 공유 상태 1이면 SharePost 테이블에 추가
                Member member = schedule.getMember();   // 공유한 멤버
                SharePost sharePost = new SharePost();
                sharePost.setMember(member);
                sharePost.setSchedule(schedule);
                sharePostRepository.save(sharePost);
            }
            return ResponseEntity.ok("공유 상태 업데이트 완료");

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("일정 찾을 수 없음");
        }
    }
}
