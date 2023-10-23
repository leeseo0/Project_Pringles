package project.finalpj.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.finalpj.DTO.SightResponseDto;
import project.finalpj.entity.Sight;
import project.finalpj.repository.BookmarkRepository;
import project.finalpj.repository.MemberRepository;
import project.finalpj.repository.SightRepository;
import project.finalpj.service.SightService;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class SightController {

    private final SightRepository sightRepository;
    private final SightService sightService;
//    private final SightResponseDto sightResponseDto;
    private final BookmarkRepository bookmarkRepository;
    private final MemberRepository memberRepository;


    // 모달 조회
    @PostMapping("/get/sight")
    public ResponseEntity<?> getSight(@RequestBody Map<String, String> map) {

//        System.out.println("너 들어오니?");
//        System.out.println(map.get("sightName"));
        String sightName = map.get("sightName");

        Sight sight = sightRepository.findByName(sightName).orElse(null);

        System.out.println(sightName);
        if (sight == null) {
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok(SightResponseDto.fromSight(sight));
        }

    }

    // 전체 관광지 리스트 조회
    @GetMapping("/get/sight")
    public List<SightResponseDto> getSightList() {
        List<Sight> sights = sightRepository.findAll();
        return sights.stream()
                .map(SightResponseDto::fromSight)
                .collect(Collectors.toList());
    }

    @GetMapping(value = "/get/sights")
    public ResponseEntity<Page<Sight>> getAllSights(@RequestParam(defaultValue = "0") int page,
                                                    @RequestParam(defaultValue = "30") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Sight> sights = sightService.getAllSights(pageable);
        System.out.println("sights" + sights);
        return ResponseEntity.ok(sights);
    }

//    // 전체 관광지 리스트 조회
//    @GetMapping("/get/sight")
//    public List<SightResponseDto> getSightList() {
//        List<Sight> sights = sightRepository.findAll();
//        return sights.stream()
//                .map(SightResponseDto::fromSight)
//                .collect(Collectors.toList());
//    }

//    // 전체 관광지 리스트 조회
//    @GetMapping("/get/sights")
//    public List<SightResponseDto> getSightList(@RequestBody Map<String, String> map) throws Exception{
//        String memberId = map.get("memberId");
//
//        Member member = memberRepository.findByUserid(memberId).orElse(null);
//        if(member != null) {
//            List<Bookmark> bookmarks = bookmarkRepository.findByMember(member);
//
//            List<String> bookmarkedSightNames = bookmarks.stream()
//                    .map(Bookmark::getSightName)
//                    .collect(Collectors.toList());
//
//            List<Sight> sights = sightRepository.findAll();
//            return sights.stream()
//                    .map(sight -> SightResponseDto.fromSights(sight, bookmarkedSightNames))
//                    .collect(Collectors.toList());
//        }
//        return null;
//    }
}
