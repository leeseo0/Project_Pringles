package project.finalpj.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.finalpj.DTO.BookmarkDTO;
import project.finalpj.entity.Bookmark;
import project.finalpj.entity.Member;
import project.finalpj.entity.Sight;
import project.finalpj.repository.BookmarkRepository;
import project.finalpj.repository.MemberRepository;
import project.finalpj.repository.SightRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookmarkService {

    @Autowired
    private BookmarkRepository bookmarkRepository;

    @Autowired
    private SightRepository sightRepository;

    @Autowired
    private MemberRepository memberRepository;

    // 북마크 추가
    public void addBookmark(String userid, Long sightid) throws IllegalAccessException {
        System.out.println("추가"+userid);
//        System.out.println(sightName);

        // 사용자 및 관광지 정보 호출
        Member member = memberRepository.findByUserid(userid).orElse(null);
        Sight sight = sightRepository.findById(sightid).orElse(null);

        if (member != null && sight != null) {
            Bookmark bookmark = new Bookmark();
            bookmark.setMember(member);
            bookmark.setSight(sight);
            bookmarkRepository.save(bookmark);
        } else {
            throw new IllegalAccessException("사용자 또는 관광지를 찾을 수 없습니다.");
        }
    }

    // 북마크 제거
    public void removeBookmark(String userid, Long sightid) throws IllegalAccessException {
        System.out.println("제거"+userid);
//        System.out.println(sightName);

        // 사용자 및 관광지 정보 호출
        Member member = memberRepository.findByUserid(userid).orElse(null);
        Sight sight = sightRepository.findById(sightid).orElse(null);

        if (member != null && sight != null) {
            Bookmark bookmark = bookmarkRepository.findByMemberAndSight(member, sight);
            if (bookmark != null) {
                bookmarkRepository.delete(bookmark);
            }
//        if (memberOptional.isPresent() && sightOptional.isPresent()) {
//            Member member = memberOptional.get();
//            Sight sight = sightOptional.get();
//
//            Bookmark bookmark = (Bookmark) bookmarkRepository.findByMemberAndSight(memberOptional, sightOptional);
//            if (bookmark != null) {
//                bookmarkRepository.delete(bookmark);
//            }
        } else {
            throw new IllegalAccessException("사용자 또는 관광지를 찾을 수 없습니다.");
        }
    }

    // 북마크 목록 조회
    public List<BookmarkDTO> getBookmarks(String userid) {
        Member member = memberRepository.findByUserid(userid).orElse(null);
        List<Bookmark> bookmarks = bookmarkRepository.findByMember(member);

        // Bookmark 엔티티에서 BookmarkDTO로 매핑
        return bookmarks.stream().map(BookmarkDTO::fromBookmark).
                collect(Collectors.toList());
    }
}
