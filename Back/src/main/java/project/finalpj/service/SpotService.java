package project.finalpj.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.finalpj.entity.Spot;
import project.finalpj.repository.SpotRepository;

import java.util.List;

@Service
public class SpotService {

    private final SpotRepository spotRepository;

    @Autowired
    public SpotService(SpotRepository spotRepository) {
        this.spotRepository = spotRepository;
    }

    public List<Spot> getAllSpots() {
        List<Spot> spots = spotRepository.findAll();
        return spots;
    }
}
