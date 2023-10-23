package project.finalpj.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.finalpj.entity.Bookmark;
import project.finalpj.entity.Member;
import project.finalpj.entity.Sight;

import java.util.List;
import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    Bookmark findByMemberAndSight(Member member, Sight sight);
    List<Bookmark> findByMember(Member member);

    Optional<Bookmark> findById(Long bookmark_id);


//    Optional<Bookmark> findByUserIdAndSightName(String userId, String sightName);
//    List<Bookmark> findByMemberUserid(String userid);
//    List<Bookmark> findBySightName(String sightName);
//    boolean existsByUserIdAndSightName(String userId, String sightName);
//    void deleteByUserIdAndSightName(String userId, String sightName);
//
//
//
//        Bookmark findByUserIdAndSightName(String userId, String sightName);
//    boolean existsByUseridAndName (String userid, String sightName);
//    void deleteByUseridAndName(String userid, sightName);
}
