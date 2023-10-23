package project.finalpj;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import project.finalpj.entity.Member;
import project.finalpj.entity.Schedule;
import project.finalpj.repository.MemberRepository;
import project.finalpj.repository.ScheduleRepository;

import java.time.LocalDate;
import java.util.Optional;

@SpringBootTest
public class ScheduleRepositoryTest {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Test
    void testJpa_1() {
        Optional<Member> om = this.memberRepository.findByUserid("lala");
        Assertions.assertTrue(om.isPresent());
        Member m = om.get();

        Schedule s1 = new Schedule();
        s1.setTitle("일정1");
//        s1.setDays(Integer(setStartDate - setEndDate));
        s1.setStartDate(LocalDate.parse("2023-10-27"));
        s1.setEndDate(LocalDate.of(2023,10,30));
        s1.setAccommodation("숙소1, 숙소2");
//        s1.setAccommodation(Arrays.asList("숙소1", "숙소2"));
        s1.setRecommendYN("N");
        s1.setSights("관광지1, 관광지2, 관광지3, 관광지4, 관광지5");
//        s1.setSights(Arrays.asList("관광지1, 관광지2, 관광지3, 관광지4, 관광지5"));
        s1.setTransportation("자가용");
        this.scheduleRepository.save(s1);
    }

    @Test
    void testJpa_2() {
        Optional<Member> om = this.memberRepository.findByUserid("lala");
        Assertions.assertTrue(om.isPresent());
        Member m = om.get();

        Schedule s1 = new Schedule();
        s1.setTitle("일정2");
        s1.setStartDate(LocalDate.of(2023,11,15));
        s1.setEndDate(LocalDate.of(2023,11,18));
//        s1.setAccommodation(Arrays.asList("숙소1", "숙소2"));
        s1.setAccommodation("숙소3, 숙소4, 숙소5");
        s1.setRecommendYN("Y");
        s1.setPriceWeight(0.3);
        s1.setRatingWeight(0.7);
        s1.setReviewWeight(0.5);
//        s1.setSights(Arrays.asList("관광지1, 관광지2, 관광지3, 관광지4, 관광지5"));
        s1.setSights("관광지1, 관광지2, 관광지3, 관광지4, 관광지5, 관광지6, 관광지7, 관광지8");
        s1.setTransportation("자가용");
        this.scheduleRepository.save(s1);
    }

    @Test
    void testJpa_3() {
        Optional<Member> om = this.memberRepository.findByUserid("lala");
        Assertions.assertTrue(om.isPresent());
        Member m = om.get();

        Schedule s1 = new Schedule();
        s1.setTitle("일정3");
        s1.setStartDate(LocalDate.parse("2023-10-24"));
        s1.setEndDate(LocalDate.of(2023,10,27));
//        s1.setAccommodation(String.join(",", Arrays.asList("숙소1", "숙소2")));
//        s1.setAccommodation(Arrays.asList("숙소1", "숙소2"));
        s1.setRecommendYN("N");
//        s1.setSights(String.join(",", Arrays.asList("관광지1","관광지2","관광지3")));
//        s1.setSights(Arrays.asList("관광지1, 관광지2, 관광지3, 관광지4, 관광지5"));
        s1.setTransportation("대중교통");
        this.scheduleRepository.save(s1);
    }
}
