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
import project.finalpj.entity.Hostel;
import project.finalpj.service.HostelService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class HostelController {

    private final HostelService hostelService;

    @Autowired
    public HostelController(HostelService hostelService) {
        this.hostelService = hostelService;
    }

    // 숙소 목록 리스트로 호출
//    @GetMapping(value = "/createplan/choiceaccommodation")
//    public ResponseEntity<List<Hostel>> getAllHostels() {
//        List<Hostel> hostels = hostelService.getAllHostels();
////        System.out.println(hostels);
//        return ResponseEntity.ok(hostels);
//    }

    // 숙소 목록 페이징하여 호출
    @GetMapping(value = "/createplan/choiceaccommodation")
    public ResponseEntity<Page<Hostel>> getAllHostels(@RequestParam(defaultValue = "0") int page,
                                                      @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Hostel> hostels = hostelService.getAllHostels(pageable);
        return ResponseEntity.ok(hostels);
    }
}
