package project.finalpj.repository;

import project.finalpj.entity.Sight;
import org.springframework.data.jpa.repository.JpaRepository;
import project.finalpj.entity.Sight;

import java.util.Optional;

public interface SightRepository extends JpaRepository<Sight, Long> {
    Optional<Sight> findByName(String name);

}
