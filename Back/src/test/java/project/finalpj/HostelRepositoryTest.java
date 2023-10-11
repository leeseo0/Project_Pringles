package project.finalpj;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import project.finalpj.entity.Hostel;
import project.finalpj.repository.HostelRepository;

@SpringBootTest
public class HostelRepositoryTest {

    @Autowired
    private HostelRepository hostelRepository;

    @Test
    void testJpa_1() {
        Hostel h1 = new Hostel();
        h1.getName();
        h1.getType();
        h1.getAddress1();
        h1.getAddress2();
        h1.getTel();
        h1.getHomepage();
        h1.getChecktime();
        h1.getRating();
        h1.getReview();
        h1.getLatitude();
        h1.getLongitude();
        h1.getTheme();
        h1.getThemenum();
        h1.getFirstimage();
        h1.getSecondimage();
    }
}
