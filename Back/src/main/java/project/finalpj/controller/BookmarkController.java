package project.finalpj.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.finalpj.DTO.BookmarkDTO;
import project.finalpj.entity.Bookmark;
import project.finalpj.repository.BookmarkRepository;
import project.finalpj.service.BookmarkService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class BookmarkController {

    @Autowired
    private BookmarkService bookmarkService;
    private BookmarkRepository bookmarkRepository;

    // 북마크 추가
    @PostMapping("/bookmark/add/{userid}")
    public void addBookmark(@PathVariable String userid, @RequestBody Map<String, Long> map) throws IllegalAccessException {
        Long sightid = map.get("sightid");
        bookmarkService.addBookmark(userid, sightid);
    }

    // 북마크 제거 (관광지 목록 페이지에서)
    @PostMapping("/bookmark/remove/{userid}")
    public void removeBookmark(@PathVariable String userid, @RequestBody Map<String, Long> map) throws IllegalAccessException {
        Long sightid = map.get("sightid");
        bookmarkService.removeBookmark(userid, sightid);
    }

    // 북마크 목록 조회
    @GetMapping("/mypage/bookmark/{userid}")
    public List<BookmarkDTO> getBookmarks(@PathVariable String userid) {
        return bookmarkService.getBookmarks(userid);
    }


    // 마이페이지 북마크 목록에서 제거
    @DeleteMapping("/mypage/bookmark/bookmark-delete/{bookmark_id}")
    public String bookmarkDelete(@PathVariable("bookmark_id") Long bookmark_id) {
        System.out.println(bookmark_id);
        Optional<Bookmark> bookmark = this.bookmarkRepository.findById(bookmark_id);
        System.out.println("마이페이지에서 북마크 제거");
        if (bookmark.isPresent()) {
            Bookmark b = bookmark.get();
            bookmarkRepository.delete(b);
            return null;
        } else {
            return "not delete";
        }
    }



//    public ResponseEntity<String> addBookmark(@PathVariable("userid") String userid, @RequestBody BookmarkDTO bookmarkDTO) {
//        System.out.println("북마크 값 들어오는지?");
//
//        Member member = this..getReferenceById(userid);
//        Sight sight = this.sightRepository.
//        Bookmark bookmark = new Bookmark();
//
//        bookmark.setMember(member);
//    }




//    public ResponseEntity<String> addBookmark(@AuthenticationPrincipal MemberAdapter memberAdapter, @PathVariable String sightName){
//        boolean result = false;
//
//        if (memberAdapter != null) {
//            result = bookmarkService.addBookmark(memberAdapter.getMember(), sightName);
//        }
//
//        return result ?
//                new ResponseEntity<>(HttpStatus.OK)
//                : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//    }
//
//
}
