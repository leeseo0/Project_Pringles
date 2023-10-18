import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from 'styled-components';
import { useLocation, useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
`;

const DataContainer = styled.div`
  flex: 1; /* 데이터 컨테이너가 남는 공간을 모두 차지하도록 설정 */
  padding: 20px; /* 필요한 패딩 추가 */
`;

const MapContainer = styled.div`
  position:sticky;
  width: 600px; /* 지도 컨테이너의 너비를 조절하여 원하는 크기로 설정 */
`;

function ShowSelection() {
    const location = useLocation();
    const {selectedStartDate, selectedEndDate, diff, selectedHostels, selectedRecommedYn, inputReviewWeight, inputPriceWeight, inputRatingWeight, selectedSights, selectedTrans, title} = location.state;
    console.log('show')
    console.log(diff)

    const [scheduleList, setScheduleList] = useState([]);
    const mapRef = useRef(null);

    useEffect(() => {
        axios.post('http://localhost:8000/recommendschedule',{
            title:title,
            startdate:selectedStartDate,
            enddate:selectedEndDate,
            days:parseInt(diff),
            accommodation:JSON.stringify(selectedHostels),
            recommendyn:selectedRecommedYn,
            priceweight:parseFloat(inputPriceWeight),
            ratingweight:parseFloat(inputRatingWeight),
            reviewweight:parseFloat(inputReviewWeight),
            sights:JSON.stringify(selectedSights),
            transportation:selectedTrans})
            .then(response => {
                const data = response.data;
                setScheduleList(data);
                // 응답 처리
                console.log(response.data);
            })
            .catch(error => {
                // 오류 처리
                console.error(error);
            });
    }, []); 

    useEffect(() => {
        // 카카오맵 API 로드
        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=c9b365269f416eb1d7f482527ffb751d&autoload=false`;
        script.async = true;
        script.onload = () => {
            window.kakao.maps.load(() => {
                initializeMap();
            });
        };
        document.head.appendChild(script);
    }, []);

    // 일정을 'day' 기준으로 그룹화
    const groupedSchedule = scheduleList.reduce((groups, plan) => {
        const day = plan.day;
        if (!groups[day]) {
            groups[day] = [];
        }
        groups[day].push(plan);
        return groups;
    }, {});
    
    const scheduleColors = ["#f44336", "#ff9800", "#4caf50", "#00bcd4", "#9c27b0"];
    let colorIndex = 0;

    const initializeMap = () => {
        const container = document.getElementById("map");
        const options = {
            center: new window.kakao.maps.LatLng(33.36167, 126.52917), // 초기 지도 중심 좌표
            level: 10, // 초기 지도 확대 수준
        };
        mapRef.current = new window.kakao.maps.Map(container, options);
        const dayColors = {};

        // 그룹화된 일정별 관광지를 선으로 연결
        Object.keys(groupedSchedule).forEach((day) => {
            const daySchedule = groupedSchedule[day];
            
            let prevMarker = null; // 이전 마커를 추적하기 위한 변수
            
            // 현재 색상을 가져오고 다음 색상으로 이동
            const currentColor = scheduleColors[colorIndex];
            colorIndex = (colorIndex + 1) % scheduleColors.length;

            dayColors[day] = currentColor;

            // 각 일자에 대한 색상을 랜덤하게 생성
            // dayColors[day] = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    
            daySchedule.forEach((plan) => {
                const markerPosition = new window.kakao.maps.LatLng(plan.sight_latitude, plan.sight_longitude);
                const marker = new window.kakao.maps.Marker({ position: markerPosition });
                
                // 시작 위치에 대한 사용자 정의 마커 이미지
                const startMarkerImage = new window.kakao.maps.MarkerImage(
                    'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 사용자 정의 마커 이미지의 URL로 대체
                    new window.kakao.maps.Size(30, 30), // 사용자 정의 마커의 크기를 설정합니다.
                );

                // 시작 위치의 위도와 경도 가져오기
                const startLatitude = parseFloat(plan.start_latitude);
                const startLongitude = parseFloat(plan.start_longitude);
    
                // 시작 위치에 마커 생성
                const startMarkerPosition = new window.kakao.maps.LatLng(startLatitude, startLongitude);
                const startMarker = new window.kakao.maps.Marker({ position: startMarkerPosition, image:startMarkerImage });
    
                // // 번호를 표시하는 커스텀 오버레이 추가
                // const customOverlay = new window.kakao.maps.CustomOverlay({
                //     content: `<div class="custom-overlay">${day + 1}</div>`,
                //     position: startMarkerPosition,
                // });
                // customOverlay.setMap(mapRef.current);
                
                // 마커를 지도에 추가
                marker.setMap(mapRef.current);
                startMarker.setMap(mapRef.current);
    
                // 선을 그리기 위한 좌표 설정
                if (prevMarker) {
                    const linePath = [prevMarker.getPosition(), startMarkerPosition, markerPosition];
                    const polyline = new window.kakao.maps.Polyline({
                        path: linePath,
                        strokeWeight: 3,
                        strokeColor: dayColors[day], // 해당 일자의 색상을 할당
                    });
                    polyline.setMap(mapRef.current);
                }
    
                // 마커 클릭 시 팝업을 표시할 수 있음
                window.kakao.maps.event.addListener(marker, 'click', () => {
                    // 팝업 표시 로직을 추가
                });
    
                prevMarker = marker; // 현재 마커를 이전 마커로 설정
            });
        });
    }; 


    return (
        <div className="container my-3">
            <h2><b>일정 생성</b></h2>
            <br />
            <Container>
                <DataContainer>
                    {Object.keys(groupedSchedule).map((day, index) => (
                        <div key={index}>
                            <h3><b>Day {day}</b></h3>
                            {groupedSchedule[day].map((plan, planIndex) => (
                                <div key={planIndex} style={{ display: 'flex', alignItems: 'center' }}>
                                    <div>
                                        <h6><b>Name: {plan.sight_name}</b></h6>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </DataContainer>
                <MapContainer>
                    <div id="map" style={{ width: "100%", height: "600px" }}></div>
                </MapContainer>
            </Container>
        </div>
    );
}

export default ShowSelection;