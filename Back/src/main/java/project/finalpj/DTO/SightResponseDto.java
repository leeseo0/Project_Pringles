package project.finalpj.DTO;

import project.finalpj.entity.Sight;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SightResponseDto {
    private String name;
    private String type;
    private String address1;
    private String address2;
    private String tel;
    private String placetime;
    private float rating;
    private float review;
    private String price;
    private String theme;
    private String firstimage;

    public static SightResponseDto fromSight (Sight sight) {
        SightResponseDto sightResponseDto = new SightResponseDto();
        sightResponseDto.setName(sight.getName());
        sightResponseDto.setType(sight.getType());
        sightResponseDto.setAddress1(sight.getAddress1());
        sightResponseDto.setAddress2(sight.getAddress1());
        sightResponseDto.setTel(sight.getTel());
        sightResponseDto.setPlacetime(sight.getPlacetime());
        sightResponseDto.setRating(sight.getRating());
        sightResponseDto.setReview(sight.getReview());
        sightResponseDto.setPrice(sight.getPrice());
        sightResponseDto.setTheme(sight.getTheme());
        sightResponseDto.setFirstimage(sight.getFirstimage());

        return sightResponseDto;
    }
}
