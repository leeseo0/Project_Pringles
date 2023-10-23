package project.finalpj.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import project.finalpj.DTO.SharePostDTO;
import project.finalpj.entity.SharePost;
import project.finalpj.repository.SharePostRepository;
import project.finalpj.service.SharePostService;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class SharePostController {

    private final SharePostService sharePostService;
    private final SharePostRepository sharePostRepository;

    // 공유 게시물 목록 조회
    @GetMapping("/mypage/sharepost")
    public List<SharePostDTO> getPosts() {
        System.out.println("공유 게시물 목록 조회");
        return sharePostService.getPosts();
    }

    // 공유 게시물 상세 페이지
    @GetMapping("/mypage/sharepost/{post_id}")
    public ResponseEntity<?> getPostsDetail(@PathVariable("post_id") Long post_id) {
        System.out.println("공유 상세 페이지 뜨남");
        Optional<SharePost> sharePostOptional = sharePostRepository.findById(post_id);

        if (sharePostOptional.isPresent()) {
            SharePostDTO sharePostDTO = SharePostDTO.fromSharePost(sharePostOptional.get());
            return ResponseEntity.ok(sharePostDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("게시물을 찾을 수 없습니다.");
        }
    }


//    // 공유게시물 추가
//    @PostMapping("/save/sharepost")
//    public ResponseEntity<?> saveSharePost(@RequestBody Map<String, String> map){
//        Long scheduleId = Long.valueOf(map.get("scheduleId"));
//        String memberId = map.get("memberId");
//
//        Boolean saveSharePostSuccess = sharePostService.saveSharePost(scheduleId,memberId);
//        if(saveSharePostSuccess) {
//            return ResponseEntity.ok().build();
//        }
//        return ResponseEntity.badRequest().build();
//    }
}