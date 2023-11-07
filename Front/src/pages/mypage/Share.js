// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import "../style/Share.modul.css"; // CSS 파일을 import

// function ShareList() {
//   const [posts, setPosts] = useState([]);
//   const [sharingPost, setSharingPost] = useState([]);

//   useEffect(() => {
//     // 가상 데이터를 사용하여 초기 상태 설정
//     const fakePosts = [
//       {
//         id: 1,
//         title: 'Post 1',
//         subtitle: 'Subtitle 1',
//         likes: 10,
//         comments: 5,
//         views: 100,
//       },
//       {
//         id: 2,
//         title: 'Post 2',
//         subtitle: 'Subtitle 2',
//         likes: 15,
//         comments: 7,
//         views: 150,
//       },
//       {
//         id: 3,
//         title: 'Post 3',
//         subtitle: 'Subtitle 3',
//         likes: 20,
//         comments: 8,
//         views: 200,
//       },
//     ];

//     setPosts(fakePosts);

//     const fakeSharingPost = [
//       {
//         id: 1,
//         title: 'Sharing Post 1',
//         body: 'This is the body of Sharing Post 1',
//       },
//       {
//         id: 2,
//         title: 'Sharing Post 2',
//         body: 'This is the body of Sharing Post 2',
//       },
//       {
//         id: 3,
//         title: 'Sharing Post 3',
//         body: 'This is the body of Sharing Post 3',
//       },
//     ];

//     setSharingPost(fakeSharingPost);
//   }, []);

//   return (
//     <div>
//       <div className="card"> {/* 사용하려는 CSS 클래스 이름을 여기에 넣으세요 */}
//         <div className="card__wrapper">
//           <img src="https://img.myloview.com/stickers/set-of-pictures-flat-color-ui-icon-digital-photo-library-multimedia-management-visual-design-simple-filled-element-for-mobile-app-colorful-solid-pictogram-vector-isolated-rgb-illustration-700-317129657.jpg" alt="Your Image" className="card__img" /> {/* 클래스 이름 추가 */}
//           <h2 className="card__title">title: {sharingPost[1] && sharingPost[1].title}</h2>
//           <p className="card__subtitle">subtitle: {sharingPost[1] && sharingPost[1].subtitle}</p>
//           <div className="card__icon">
//             {/* 여기에 아이콘을 넣으세요 */}
//           </div>
//         </div>
//         <div className="sharing-post">
//           {sharingPost.map((sharing, index) => (
//             <div key={sharing.id} className="sharing-card">
//               <h2 className="sharing-title"><b>sharing_title: </b>{sharing.title}</h2>
//               <p className="sharing-body"><b>sharing_body: </b>{sharing.body}</p>
//             </div>
//             ))}
//           </div>
//       </div>
//     </div>
//   );
// }

// export default ShareList;




import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ShareList() {
  const [postList, setPostList] = useState([]);

  const navigate = useNavigate();

  // 공유 일정 목록 불러오기
  useEffect(() => {
    async function getPostList() {
      try {
        const result = await axios.get("http://localhost:8080/mypage/sharepost");
          console.log(result)
          setPostList(result.data);
      } catch(error) {
        console.log(error);
      }
    }
    getPostList();
  }, [])


  return (
    <div>
      <h3><b>제 일정 어때융?</b></h3>
      <br/>
      <div className="row">
        {postList.map((post, index) => {
          return (
            <div key={index} className="col-md-4">
              <div className="card" style={{width:"18rem"}} onClick={() => navigate(`/sharepost/${post.post_id}`)}>
                <img 
                src="https://img.myloview.com/stickers/set-of-pictures-flat-color-ui-icon-digital-photo-library-multimedia-management-visual-design-simple-filled-element-for-mobile-app-colorful-solid-pictogram-vector-isolated-rgb-illustration-700-317129657.jpg"
                className="card-img-top"
                alt="Your image"/>
                <div className="card-body">
                  <div className="card-text">
                    <p><b>일정명 : {post.title}</b></p>
                    <p>작성자 : {post.userid}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ShareList;