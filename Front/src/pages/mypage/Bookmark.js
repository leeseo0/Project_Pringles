import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TouristSpot from './MyActivityPage/TouristSpot';
import Sidebar from './Sidebar';
import { useNavigate } from "react-router-dom";
import axios from "axios";

// style 지정
const PageContainer = styled.div`
  display: flex;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  margin-left: 20px;
  // margin-top: 20px;
  align-items: flex-start; /* 목록을 상단으로 정렬 */
`;

const TextContainer = styled.div`
  width: 100%; /* 컨테이너 전체 너비를 사용하도록 설정 */
`;

const Text = styled.h5`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;


function Bookmark() {
  const [bookmarkList, setBookmarkList] = useState([]);


  // 북마크된 관광지 목록 불러오기
  useEffect(() => {
    async function getBookmarkList() {
      try {
        const result = await axios.get(`http://localhost:8080/mypage/bookmark/${window.localStorage.getItem("userid")}`)
        console.log('result:', result);
        setBookmarkList(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    getBookmarkList();
  }, [])

  // 북마크된 관광지 삭제 함수
  const removeBookmark = async (bookmarkId) => {
    try {
      await axios.delete(`http://localhost:8080/mypage/bookmark/bookmark-delete/${bookmarkId}`)
      window.location.reload();
    } catch (error) {
      console.log(error, '네트워크 문제');
    }
  };

  return (
    <div>
      <h3 style={{fontSize:'30px'}}><b>마이페이지</b></h3>
      <br/>
        <PageContainer>
          <Sidebar /> {/* 사이드바를 여기에 추가 */}
          <div className="row" style={{marginLeft:'10px'}}>
            <h4 style={{fontSize:'20px', fontWeight:'bold'}}>나의 찜한 장소🏷️</h4>
              {bookmarkList.map((spot, index) => {
                // ***********하트 누르면 DB에서도 삭제되는 기능 구현***********
                return (
                  <div className="col-md-4">
                    <TouristSpot
                      key={index}
                      name={spot.name}
                      imageUrl={spot.firstimage}
                      tags={spot.theme}
                      onRemoveBookmark ={() => removeBookmark(spot.bookmark_id)}
                    >
                    </TouristSpot>
                  </div>
                )
              })}
          </div>
        </PageContainer>
    </div>
    // <div>
    //   <h3><b>마이페이지</b></h3>
    //   <br/>
    //     <PageContainer>
    //       <Sidebar /> {/* 사이드바를 여기에 추가 */}
    //       <Container>
    //         <TextContainer>
    //           <Text>나의 찜한 장소🏷️</Text>
    //         </TextContainer>
    //           {bookmarkList.map((spot, index) => {
    //             // ***********하트 누르면 DB에서도 삭제되는 기능 구현해야 함***********
    //             return (
    //               <div>
    //                 <TouristSpot_cp
    //                 key={index}
    //                 name={spot.name}
    //                 imageUrl={spot.firstimage}
    //                 tags={spot.theme}>
    //                 </TouristSpot_cp>
    //               </div>
    //             )
    //           })}
    //       </Container>
    //     </PageContainer>
    // </div>
  );
};

export default Bookmark;