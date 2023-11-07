package project.finalpj;

import project.finalpj.entity.Sight;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import project.finalpj.repository.SightRepository;

import java.util.Optional;

@SpringBootTest
public class RepositoryTest {

    @Autowired
    private SightRepository sightRepository;

    @Test
    void testJpa_1() {
        Optional<Sight> sight = this.sightRepository.findByName("스누피가든");
        Assertions.assertTrue(sight.isPresent());
        Sight s = sight.get();
        s.getAddress1();
    }
}
