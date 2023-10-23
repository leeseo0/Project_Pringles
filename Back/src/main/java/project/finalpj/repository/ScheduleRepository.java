package project.finalpj.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.finalpj.entity.Schedule;

import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByMemberUserid(String userid);
    Optional<Schedule> findById(Long schedule_id);
    List<Schedule> findByShared(Integer shared);
}
