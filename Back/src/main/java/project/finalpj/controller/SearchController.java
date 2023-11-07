package project.finalpj.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import project.finalpj.entity.Search;
import project.finalpj.repository.SearchRepository;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class SearchController {

    private final SearchRepository searchRepository;

    @GetMapping("/search")
    public List<Search> search(@RequestParam String keyword) {
        // 검색어를 이용하여 데이터베이스에서 조회
        List<Search> searchResults = searchRepository.findByNameContaining(keyword);
//        List<Search> searchResults = searchRepository.findByThemeContaining(keyword);
        return searchResults;
    }
}
