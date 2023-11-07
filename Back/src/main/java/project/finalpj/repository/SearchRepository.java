package project.finalpj.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.finalpj.entity.Search;

import java.util.List;

public interface SearchRepository extends JpaRepository<Search, Integer> {
    List<Search> findByNameContaining(String keyword);
    List<Search> findByThemeContaining(String keyword);

//    @Query("SELECT name FROM Search WHERE theme LIKE %:theme% AND new_type = :newType")
//    List<Search> findByThemeContainingAndNew_type(@Param("theme") String theme, @Param("newType") String newType);
}
