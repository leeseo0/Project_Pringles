package project.finalpj.DTO;

import lombok.Getter;
import lombok.Setter;
import project.finalpj.entity.Bookmark;
import project.finalpj.entity.Member;
import project.finalpj.entity.Sight;

@Getter
@Setter
public class BookmarkDTO {
    private Long bookmark_id;
    private String userid;   // Member 엔티티와 연결
//    private Long sightid;   // Sight 엔티티와 연결
    private String name;
    private String theme;
    private int review;
    private double rating;
    private String firstimage;

//    public BookmarkDTO(String name, String theme, int review, double rating, String firstimage) {
//        this.name = name;
//        this.theme = theme;
//        this.review = review;
//        this.rating = rating;
//        this.firstimage = firstimage;
//    }

    public static BookmarkDTO fromBookmark(Bookmark bookmark) {
        BookmarkDTO bookmarkDTO = new BookmarkDTO();
        bookmarkDTO.setBookmark_id(bookmark.getBookmark_id());

        // Member 엔티티에서 userid 가져오기
        Member member = bookmark.getMember();
        if (member != null) {
            bookmarkDTO.setUserid(member.getUserid());
        }

        // Sight 엔티티에서 theme, review, rating, firstimage 값 가져와서 설정
        Sight sight = bookmark.getSight();
        if (sight != null) {
//            bookmarkDTO.setSightid(sight.getSightid());
            bookmarkDTO.setName(sight.getName());
            bookmarkDTO.setTheme(sight.getTheme());
            bookmarkDTO.setReview(sight.getReview());
            bookmarkDTO.setRating(sight.getRating());
            bookmarkDTO.setFirstimage(sight.getFirstimage());
        }

        return bookmarkDTO;
    }
}
