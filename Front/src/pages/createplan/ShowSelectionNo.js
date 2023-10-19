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

function ShowSelectionNo() {
    const location = useLocation();
    const {selectedStartDate, selectedEndDate, diff, selectedHostels, selectedRecommedYn, selectedSights, selectedTrans, title} = location.state;
    console.log('show')
    console.log(diff)

    const [scheduleList, setScheduleList] = useState([]);
    const mapRef = useRef(null);

    useEffect(() => {
        axios.post('http://localhost:8000/recommendscheduleNo',{
            title:title,
            startdate:selectedStartDate,
            enddate:selectedEndDate,
            days:parseInt(diff),
            accommodation:JSON.stringify(selectedHostels),
            recommendyn:selectedRecommedYn,
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


    const initializeMap = () => {
        const container = document.getElementById("map");
        const options = {
            center: new window.kakao.maps.LatLng(33.36167, 126.52917), // 초기 지도 중심 좌표
            level: 10, // 초기 지도 확대 수준
        };
        mapRef.current = new window.kakao.maps.Map(container, options);

        // 그룹화된 일정별 관광지를 선으로 연결
        Object.keys(groupedSchedule).forEach((day) => {
            const daySchedule = groupedSchedule[day];
    
            let prevMarker = null; // 이전 마커를 추적하기 위한 변수
    
            daySchedule.forEach((plan) => {
                const markerPosition = new window.kakao.maps.LatLng(plan.sight_latitude, plan.sight_longitude);
                const marker = new window.kakao.maps.Marker({ position: markerPosition });
                const startMarkerPosition = new window.kakao.maps.LatLng(plan.startLatitude, plan.startLongitude);
                const startMarker = new window.kakao.maps.Marker({ position: startMarkerPosition });
    
                // 마커를 지도에 추가
                marker.setMap(mapRef.current);
                startMarker.setMap(mapRef.current);

    
                // 선을 그리기 위한 좌표 설정
                if (prevMarker) {
                    const linePath = [prevMarker.getPosition(), markerPosition];
                    const polyline = new window.kakao.maps.Polyline({
                        path: linePath,
                        strokeWeight: 2,
                        strokeColor: 'red', // 선의 색상 설정
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
                            <div className="row">
                                <div className="col-md-5">
                                {groupedSchedule[day].map((plan, planIndex) => (
                                    <div key={planIndex} className="card mb-4" style={{ marginBottom: '10px',maxHeight: '300px' }}>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <img src={plan.firstimage} className="card-img" alt={plan.name}/>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div>
                                                        <h5 className="card-title"><b>{plan.sight_name}</b></h5>
                                                        <p className="card-text">{plan.type}</p>
                                                        <p className="card-text">도로명주소 : {plan.address1 == '없음' ? plan.address2 : plan.address1}</p>
                                                        <p className="card-text">⭐{plan.rating} ✏️{plan.review}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                </div>
                            </div>
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

export default ShowSelectionNo;