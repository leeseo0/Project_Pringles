//package com.example.demo.Controller;
//
//import com.example.demo.DTO.BookmarkDTO;
//import com.example.demo.DTO.SightResponseDto;
//import com.example.demo.Entity.Bookmark;
//import com.example.demo.Repository.BookmarkRepository;
//import com.example.demo.Service.BookmarkService;
//import com.sun.net.httpserver.Authenticator;
//import lombok.RequiredArgsConstructor;
//import org.apache.catalina.connector.Response;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.*;
//
//import javax.servlet.http.HttpSession;
//import javax.validation.Valid;
//import java.util.List;
//
//@RestController
//@RequiredArgsConstructor
//@CrossOrigin(origins = "http://localhost:3000" )
//public class BookmarkController {
//
//    private final BookmarkService bookmarkService;
//    private final BookmarkRepository bookmarkRepository;
//
//    @PostMapping("/bookmakr/{sightName}")
//    public ResponseEntity<String> addBookmark(@AuthenticationPrincipal MemberAdapter memberAdapter, @PathVariable String sightName){
//        boolean result = false;
//
//        if (memberAdapter != null) {
//            result = bookmarkService.addBookmark(memberAdapter.getMember(), sightName);
//        }
//
//        return result ?
//                new ResponseEntity<>(HttpStatus.OK)
//                : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//    }
//
//
//}
