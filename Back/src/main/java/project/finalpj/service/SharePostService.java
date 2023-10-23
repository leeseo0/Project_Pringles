package project.finalpj.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import project.finalpj.DTO.SharePostDTO;
import project.finalpj.entity.SharePost;
import project.finalpj.repository.SharePostRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SharePostService {

    private final SharePostRepository sharePostRepository;

    // 공유된 게시물 조회
    public List<SharePostDTO> getPosts() {
        List<SharePost> sharePosts = sharePostRepository.findAll();
        return sharePosts.stream().map(SharePostDTO::fromSharePost).
                collect(Collectors.toList());
    }

//    private final SharePostRepository sharePostRepository;
//    private final MemberRepository memberRepository;
//    private final ScheduleRepository scheduleRepository;
//    public boolean saveSharePost(Long scheduleId, String memberId){
//        Member member = memberRepository.findByUserid(memberId).orElse(null);
//        Schedule schedule = scheduleRepository.findById(scheduleId).orElse(null);
//
//        if (member != null && schedule != null) {
//            SharePost sharePost = new SharePost();
//            sharePost.setMember(member);
//            sharePost.setSchedule(schedule);
//            sharePostRepository.save(sharePost);
//            return true;
//        }
//        return false;
//    }
}