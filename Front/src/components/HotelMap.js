import React, { useState, useEffect } from 'react';
import axios from "axios";

function HotelMap({  currentPage, pageSize }) {
  const [hostels, setHostels] = useState([]);

  useEffect(() => {
    async function getHostels() {
      try {
        const response = await axios.get(`http://localhost:8080/createplan/choiceaccommodation?page=${currentPage}&size=${pageSize}`);
        if (response.status === 200) {
          setHostels(response.data.content);
          console.log("호텔 정보: ", response.data.content);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getHostels();
  }, [currentPage, pageSize]);

  useEffect(() => {
    if (window.kakao && window.kakao.maps && hostels.length > 0) {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(33.36167, 126.52917),
        level: 10
      };
      const map = new window.kakao.maps.Map(container, options);

      hostels.forEach((hostel) => {
        if (hostel.latitude && hostel.longitude) {
          const markerPosition = new window.kakao.maps.LatLng(hostel.latitude, hostel.longitude);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);

          // 커스텀 오버레이 내용
          const content = `
            <div class="customoverlay">
              <div class="body">${hostel.name}</div>
            </div>
          `;

          const position = new window.kakao.maps.LatLng(hostel.latitude, hostel.longitude);

          const customOverlay = new window.kakao.maps.CustomOverlay({
            position: position,
            content: content,
          });

          // 마커에 마우스 오버 이벤트 추가
          window.kakao.maps.event.addListener(marker, 'mouseover', function () {
            customOverlay.setMap(map);
          });

          // 마커에 마우스 아웃 이벤트 추가
          window.kakao.maps.event.addListener(marker, 'mouseout', function () {
            customOverlay.setMap(null);
          });
        }
      });
    }
  }, [hostels]);

  return (
    <div id="map" style={{ width: '100%', height: '500px' }}></div>
  );
}

export default HotelMap;




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


