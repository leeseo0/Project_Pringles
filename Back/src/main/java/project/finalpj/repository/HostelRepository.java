package project.finalpj.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.finalpj.entity.Hostel;

public interface HostelRepository extends JpaRepository<Hostel, Long> {
//    Page<Hostel> findAll(Pageable pageable);
}
