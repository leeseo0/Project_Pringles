package project.finalpj.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.finalpj.entity.Spot;

public interface SpotRepository extends JpaRepository<Spot, Long> {
}
