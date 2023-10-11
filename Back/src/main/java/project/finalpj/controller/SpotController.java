package project.finalpj.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import project.finalpj.entity.Spot;
import project.finalpj.service.SpotService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SpotController {

    private final SpotService spotService;

    @Autowired
    public SpotController(SpotService spotService) {
        this.spotService = spotService;
    }

    @GetMapping(value = "/createplan/choicesights")
    public ResponseEntity<List<Spot>> getAllSpots() {
        List<Spot> spots = spotService.getAllSpots();
        return ResponseEntity.ok(spots);
    }
}
