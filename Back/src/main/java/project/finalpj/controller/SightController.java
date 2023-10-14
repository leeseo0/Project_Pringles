package project.finalpj.controller;

import project.finalpj.entity.Sight;
import project.finalpj.repository.SightRepository;
import project.finalpj.DTO.SightResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class SightController {

    private final SightRepository sightRepository;
//    private final SightResponseDto sightResponseDto;

    @PostMapping("/get/sight")
    public ResponseEntity<?> getSight(@RequestBody Map<String, String> map) {

//        System.out.println("너 들어오니?");
//        System.out.println(map.get("sightName"));
        String sightName = map.get("sightName");

        Sight sight = sightRepository.findByName(sightName).orElse(null);

        System.out.println(sight);
        if (sight == null) {
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok(SightResponseDto.fromSight(sight));
        }

    }

    @GetMapping("/get/sight")
    public List<SightResponseDto> getSightList() {
        List<Sight> sights = sightRepository.findAll();
        return sights.stream()
                .map(SightResponseDto::fromSight)
                .collect(Collectors.toList());
    }
}
