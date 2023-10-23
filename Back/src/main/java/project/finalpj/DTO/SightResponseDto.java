package project.finalpj.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.finalpj.entity.Sight;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SightResponseDto {
    private Long sightid;
    private String name;
    private String type;
    private String address1;
    private String address2;
    private String tel;
    private String placetime;
    private double rating;
    private int review;
    private String theme;
    private String firstimage;
    private double latitude;
    private double longitude;
    private boolean bookmarkState;

    public static SightResponseDto fromSights (Sight sight, List<String> bookmarkedSightNames) {
        SightResponseDto sightResponseDto = new SightResponseDto();
        sightResponseDto.setName(sight.getName());
        sightResponseDto.setType(sight.getType());
        sightResponseDto.setAddress1(sight.getAddress1());
        sightResponseDto.setAddress2(sight.getAddress1());
        sightResponseDto.setTel(sight.getTel());
        sightResponseDto.setPlacetime(sight.getPlacetime());
        sightResponseDto.setRating(sight.getRating());
        sightResponseDto.setReview(sight.getReview());
        sightResponseDto.setTheme(sight.getTheme());
        sightResponseDto.setFirstimage(sight.getFirstimage());
        sightResponseDto.setLatitude(sight.getLatitude());
        sightResponseDto.setLongitude(sight.getLongitude());

        String sightName = sight.getName();
        boolean isBookmarked = bookmarkedSightNames.contains(sightName); // 있으면 true, 없으면 false
        sightResponseDto.setBookmarkState(isBookmarked);

        return sightResponseDto;
    }

    public static SightResponseDto fromSight (Sight sight) {
        SightResponseDto sightResponseDto = new SightResponseDto();
        sightResponseDto.setSightid(sight.getSightid());
        sightResponseDto.setName(sight.getName());
        sightResponseDto.setType(sight.getType());
        sightResponseDto.setAddress1(sight.getAddress1());
        sightResponseDto.setAddress2(sight.getAddress1());
        sightResponseDto.setTel(sight.getTel());
        sightResponseDto.setPlacetime(sight.getPlacetime());
        sightResponseDto.setRating(sight.getRating());
        sightResponseDto.setReview(sight.getReview());
        sightResponseDto.setTheme(sight.getTheme());
        sightResponseDto.setFirstimage(sight.getFirstimage());
        sightResponseDto.setLatitude(sight.getLatitude());
        sightResponseDto.setLongitude(sight.getLongitude());

        return sightResponseDto;
    }
}
