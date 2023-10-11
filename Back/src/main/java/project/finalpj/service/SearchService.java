//package project.finalpj.service;
//
//import org.springframework.stereotype.Service;
//import project.finalpj.entity.Search;
//import project.finalpj.repository.SearchRepository;
//
//import java.util.List;
//
//@Service
//public class SearchService {
//
//    private final SearchRepository searchRepository;
//
//    public SearchService(SearchRepository searchRepository) {
//        this.searchRepository = searchRepository;
//    }
//
//    public List<Search> searchByThemeAndType(String themeKeyword, String type) {
//        return searchRepository.findByThemeContainingAndNew_type(themeKeyword, type);
//    }
//}
