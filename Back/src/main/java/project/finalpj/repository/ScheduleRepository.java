package project.finalpj.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.finalpj.entity.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
}
