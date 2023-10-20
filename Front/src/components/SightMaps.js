import React, { useState, useEffect} from 'react';
import axios from "axios";
// import Overlay from "../style/Overlay";l

const { kakao } = window;

function SightMaps({ currentPage, pageSize }) {
//   const [selectedsights, setSelectedSights] = useState([]);
  const [sights, setSights] = useState([0]);

useEffect(() => {
  async function getSights() {
    try {
      const response = await axios.get(`http://localhost:8080/createplan/choicesights?page=${currentPage}&size=${pageSize}`);
      if (response.status === 200) {
        const { content } = response.data;
        if (content) {
        //   setSelectedSights(content);
        setSights(content);
          console.log("지도임 : ", content);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  getSights();
}, [currentPage, pageSize]);

  useEffect(() => {
    if (window.kakao && window.kakao.maps && sights.length > 0) {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.36167, 126.52917),
          level: 10
        };

        const map = new window.kakao.maps.Map(container, options);

        sights.forEach((spot) => {
          if (spot.latitude && spot.longitude) {
            // 새로운 좌표를 설정
            const newMarkerPosition = new window.kakao.maps.LatLng(spot.latitude, spot.longitude);
            const marker = new window.kakao.maps.Marker({
              position: newMarkerPosition, // 새로운 좌표로 마커 생성
            });
             
            marker.setMap(map);

            // 커스텀 오버레이 내용
            const content = `
              <div class="customoverlay">
                <div class="body">${spot.name}</div>
              </div>
            `;

            const position = new kakao.maps.LatLng(spot.latitude, spot.longitude);

            const customOverlay = new kakao.maps.CustomOverlay({
              position: position,
              content: content,
            });

            // 마커에 마우스 오버 이벤트 추가
            kakao.maps.event.addListener(marker, 'mouseover', function () {
              customOverlay.setMap(map);
            });

            // 마커에 마우스 아웃 이벤트 추가
            kakao.maps.event.addListener(marker, 'mouseout', function () {
              customOverlay.setMap(null);
            });
          }
        });

        // 마커 이미지 설정
        const imageSrc = 'https://www.pngwing.com/en/free-png-zhbdl'; // 원하는 마커 이미지 주소를 설정하세요
        const imageSize = new kakao.maps.Size(64, 69);
        const imageOption = { offset: new kakao.maps.Point(27, 69) };
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
      }
    
    }, [sights]);

  return (
    <div id="map" style={{ width: '100%', height: '500px' }}></div>
  );
}

export default SightMaps;



const customOverlayStyle = {
  position: 'absolute',
  width: '200px', // 오버레이의 너비 설정
  textAlign: 'center',
  backgroundColor: 'black', // 배경 색상
  border: '1px solid #ccc', // 테두리 스타일과 색상 지정
  borderRadius: '5px', // 둥근 테두리
  padding: '10px', // 내부 패딩 설정
  fontSize: '14px',
};

const triangleStyle = {
  content: '""',
  position: 'absolute',
  width: '0',
  border: '10px solid transparent',
};

const triangleAfterStyle = {
  ...triangleStyle,
  borderTopColor: 'white', // 위쪽 삼각형의 색상
  top: '100%',
  left: '50%',
  marginLeft: '-10px', // 오버레이 가로 중앙 위치를 위한 조정
};

const triangleBeforeStyle = {
  ...triangleStyle,
  borderTopColor: '#ccc', // 테두리 위쪽 삼각형의 색상
  top: 'calc(100% - 2px)',
  left: '50%',
  marginLeft: '-10px', // 오버레이 가로 중앙 위치를 위한 조정
};


