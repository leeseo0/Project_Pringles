package project.finalpj.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import project.finalpj.entity.Spot;
import project.finalpj.repository.SpotRepository;

@Service
public class SpotService {

    private final SpotRepository spotRepository;

    @Autowired
    public SpotService(SpotRepository spotRepository) {
        this.spotRepository = spotRepository;
    }

//    public List<Spot> getAllSpots() {
//        List<Spot> spots = spotRepository.findAll();
//        return spots;
//    }

    public Page<Spot> getAllSpots(Pageable pageable) {
        return spotRepository.findAll(pageable);
    }
}
