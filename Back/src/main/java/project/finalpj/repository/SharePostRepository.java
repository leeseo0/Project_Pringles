package project.finalpj.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.finalpj.entity.Schedule;
import project.finalpj.entity.SharePost;

public interface SharePostRepository extends JpaRepository<SharePost, Long> {
    SharePost findBySchedule(Schedule schedule);
}
