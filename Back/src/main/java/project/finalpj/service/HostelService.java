package project.finalpj.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import project.finalpj.entity.Hostel;
import project.finalpj.repository.HostelRepository;

@Service
public class HostelService {

    private final HostelRepository hostelRepository;

    @Autowired
    public HostelService(HostelRepository hostelRepository) {
        this.hostelRepository = hostelRepository;
    }

    public Page<Hostel> getAllHostels(Pageable pageable) {
        return hostelRepository.findAll(pageable);
    }

//    public List<Hostel> getAllHostels() {
//        List<Hostel> hostels = hostelRepository.findAll();
//        return hostels;
////        System.out.println(hostels);
////        Hostel 엔티티를 HostelDTO로 변환하는 로직 추가
////        return hostels.stream().map(this::convertToDTO).collect(Collectors.toList());
//    }

//    private HostelDTO convertToDTO(Hostel hostel) {
//        HostelDTO dto = new HostelDTO();
//        // 엔티티 필드를 DTO로 복사
//        return dto;
//    }
}
