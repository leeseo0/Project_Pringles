package project.finalpj.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import project.finalpj.entity.Spot;
import project.finalpj.service.SpotService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SpotController {

    private final SpotService spotService;

    @Autowired
    public SpotController(SpotService spotService) {
        this.spotService = spotService;
    }

    // 숙소 목록 리스트로 호출
//    @GetMapping(value = "/createplan/choicesights")
//    public ResponseEntity<List<Spot>> getAllSpots() {
//        List<Spot> spots = spotService.getAllSpots();
//        return ResponseEntity.ok(spots);
//    }

    // 숙소 목록 페이징하여 호출
    @GetMapping(value = "/createplan/choicesights")
    public ResponseEntity<Page<Spot>> getAllSpots(@RequestParam(defaultValue = "0") int page,
                                                  @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Spot> spots = spotService.getAllSpots(pageable);
        return ResponseEntity.ok(spots);
    }
}
