package project.finalpj.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import project.finalpj.entity.Sight;
import project.finalpj.repository.SightRepository;

@Service
public class SightService {

    private final SightRepository sightRepository;

    @Autowired
    public SightService(SightRepository sightRepository) {
        this.sightRepository = sightRepository;
    }

    public Page<Sight> getAllSights(Pageable pageable) {
        return sightRepository.findAll(pageable);
    }
}
