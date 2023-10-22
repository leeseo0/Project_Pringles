import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import pinmarker from "../../images/pinmarker.png";
import redpin from "../../images/redpin.png";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
`;

const DataContainer = styled.div`
  flex: 1; /* 데이터 컨테이너가 남는 공간을 모두 차지하도록 설정 */
  padding: 20px; /* 필요한 패딩 추가 */
//   overflow-x: scroll;
  overflow-y: auto;
  height: 750px; /* 고정된 높이 설정 */
//   white-space:nowrap;
`;

// const DayContainer = styled.div`
//     border: 2px solid #ccc; /* 굵은 테두리 설정 */
//     border-radius: 10px; /* 모서리를 둥글게 설정 */
//     margin-bottom: 20px;
//     padding: 20px;
//     box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.1);
// `;

const MapContainer = styled.div`
  width: 100%; /* 가로 크기를 화면에 꽉 차게 설정 */
  height: 200px; /* 원하는 세로 크기로 설정 */
  position: sticky;
`;

const ListMapWrapper = styled.div`
  position: sticky;
  top: 0;
  left: 51%;
  margin: 0;
  max-height: 70vh; /* 화면 높이보다 높아지지 않도록 설정 */
`;

// 랜덤 색상을 생성하는 함수
function randomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function PlanDetail() {
    const [schedule, setSchedule] = useState([]);
    const [resultdata, setResultData] = useState([]);
    const params = useParams();
    const mapRef = useRef(null);

    useEffect(() => {
        async function getPlan() {
            try {
                const result = await axios.get(`http://localhost:8080/mypage/planlist/plan/${params.schedule_id}`);
                const resultdata = result.data;
                console.log('resultdata');
                console.log(resultdata);
                
                setResultData(resultdata);

                const dataToSend = {
                    schedule_id: resultdata.schedule_id,
                    title: resultdata.title,
                    startdate: resultdata.startDate,
                    enddate: resultdata.endDate,
                    days: resultdata.days,
                    accommodation: JSON.stringify(resultdata.accommodation),
                    recommendyn: resultdata.recommendYN,
                    priceweight: resultdata.priceWeight,
                    ratingweight: resultdata.ratingWeight,
                    reviewweight: resultdata.reviewWeight,
                    sights: JSON.stringify(resultdata.sights),
                    transportation: resultdata.transportation,
                };

                try {
                    const fastresult = await axios.post("http://localhost:8000/scheduleDetail", dataToSend);
                        const fastresultdata = fastresult.data;
                        console.log("fastresultdata");
                        console.log(fastresultdata);
                    setSchedule(fastresultdata);
                } catch (error) {
                    console.log("result data error", error);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getPlan();
    }, [params.schedule_id])

    console.log(params)
    let map = null;

    
    // 일정을 'day' 기준으로 그룹화
    const groupedSchedule = schedule.reduce((groups, plan) => {
        const day = plan.day;
        if (!groups[day]) {
            groups[day] = [];
            console.log('groups');
            console.log(groups[day]);
        }
        groups[day].push(plan);
        return groups;
    }, {});

    useEffect(() => {
        // 카카오맵 API 로드
        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=c9b365269f416eb1d7f482527ffb751d&autoload=false`;
        script.async = true;
        script.onload = () => {
            window.kakao.maps.load(() => {
                if (!window.kakao) {
                    window.kakao = {};
                }

                // 카카오맵 로드 후에 initializeMap 호출
                initializeMap();
            });
        };
        document.head.appendChild(script);
    }, [schedule]);

    const lineColors = Object.keys(groupedSchedule).map(() => randomColor());

    // initializeMap 함수 정의
    const initializeMap = () => {
        const container = document.getElementById("map");
        const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 초기 지도 중심 좌표
            level: 10, // 초기 지도 확대 수준
        };

        function createLinePath(groupData) {
            const linePaths = [];
            groupData.forEach((dayData, index) => {
                // const lineColor = randomColor();
                const lineColor = lineColors[index];
                const path = [ // 시작 위치를 포함한 경로 초기화
                new window.kakao.maps.LatLng(dayData[0].start_latitude, dayData[0].start_longitude),
                ];

                // 해당 날짜의 모든 관광지 위치를 경로에 추가
                dayData.forEach((sightData) => {
                path.push(new window.kakao.maps.LatLng(sightData.sight_latitude, sightData.sight_longitude));
                });

                // 시작 위치로 돌아가 경로를 완성
                path.push(new window.kakao.maps.LatLng(dayData[0].start_latitude, dayData[0].start_longitude));
                linePaths.push({path, lineColor,});
            });

        return linePaths;
        }
        const linePaths = createLinePath(Object.values(groupedSchedule));

        map = new window.kakao.maps.Map(container, options);

        // const lineColor = randomColor();
        // 지도에 표시할 선을 생성합니다
        linePaths.forEach((pathData) => {
          var polyline = new window.kakao.maps.Polyline({
            path: pathData.path, // 선을 구성하는 좌표배열 입니다
            strokeWeight: 5, // 선의 두께 입니다
            strokeColor: pathData.lineColor, // 선의 색깔입니다
            strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid' // 선의 스타일입니다
          });
          polyline.setMap(map);  
        }); 

        const markerImage = new window.kakao.maps.MarkerImage(
          redpin, // 사용자 정의 마커 이미지의 URL로 대체
          new window.kakao.maps.Size(35, 35), // 사용자 정의 마커의 크기를 설정합니다.
        );
        const startMarkerImage = new window.kakao.maps.MarkerImage(
          pinmarker, // 사용자 정의 마커 이미지의 URL로 대체
          new window.kakao.maps.Size(40, 40), // 사용자 정의 마커의 크기를 설정합니다.
        );


        // 그룹화된 일정별 관광지를 선으로 연결
        Object.keys(groupedSchedule).forEach((day) => {
            const daySchedule = groupedSchedule[day];

            let prevMarker = null; // 이전 마커를 추적하기 위한 변수

            daySchedule.forEach((plan) => {
                const markerPosition = new window.kakao.maps.LatLng(plan.sight_latitude, plan.sight_longitude);
                const marker = new window.kakao.maps.Marker({ position: markerPosition, image:markerImage });
                const startLatitude = parseFloat(plan.start_latitude);
                const startLongitude = parseFloat(plan.start_longitude);
                const startMarkerPosition = new window.kakao.maps.LatLng(startLatitude, startLongitude);
                const startMarker = new window.kakao.maps.Marker({ position: startMarkerPosition, image:startMarkerImage });

                if (!prevMarker) {
                  const startMarker = new window.kakao.maps.Marker({ position: startMarkerPosition, image: startMarkerImage });
                  const content = `
                      <div class="customoverlay">
                          <div class="day-label">Day ${day}</div>
                      </div>
                  `;
                  const customOverlay = new window.kakao.maps.CustomOverlay({
                      position: startMarkerPosition,
                      content: content,
                  });
                  window.kakao.maps.event.addListener(startMarker, 'mouseover', function () {
                      customOverlay.setMap(map);
                  });
                  window.kakao.maps.event.addListener(startMarker, 'mouseout', function () {
                      customOverlay.setMap(null);
                  });
                  startMarker.setMap(map);
                }

                // 마커를 지도에 추가
                marker.setMap(map);
                // startMarker.setMap(map);

                // 커스텀 오버레이 내용
                const content = `
                    <div class="customoverlay">
                        <div class="body">${plan.name}</div>
                    </div>
                `;

                // const position = new window.kakao.maps.LatLng(plan.sight_latitude, plan.sight_longitude);
                // const startposition = new window.kakao.maps.LatLng(plan.startlatitude, plan.startlongitude);

                const customOverlay = new window.kakao.maps.CustomOverlay({
                  position: markerPosition,
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

                // 마커에 마우스 오버 이벤트 추가
                window.kakao.maps.event.addListener(startMarker, 'mouseover', function () {
                    customOverlay.setMap(map);
                });

                // 마커에 마우스 아웃 이벤트 추가
                window.kakao.maps.event.addListener(startMarker, 'mouseout', function () {
                    customOverlay.setMap(null);
                });

                prevMarker = marker; // 현재 마커를 이전 마커로 설정
            });
        });
    };


    return (      
      <div className="container my-3">
        <h2><b>{resultdata.title}</b></h2>
        <hr />
  
        <div className="row">
          <div className="col-md-6">
            <Container>
              <DataContainer>
              {Object.keys(groupedSchedule).map((day, index) => (
                  <div key={index} style={cardStyle}>
                    <div style={toolsStyle}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h3 style={{ marginBottom: '5px', fontSize: '20px', color: 'white' }}><b>Day {day}</b></h3>
                      </div>
                      {/* day1 오른쪽에 동그라미 추가 */}
                      {/* <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: lineColors[index], marginLeft: '10px', marginTop: '-20px' }}></div> */}
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: lineColors[index], marginLeft: '10px'}}></div>
                    </div>
                   
                    <div style={cardContentStyle}>
                      {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
                      {/* <div style={titleStyle}>
                        <h3 style={{ marginBottom: '20px', fontSize: '18px' }}><b>Day {day}</b></h3>
                      </div>
                      <hr /> */}
                    
                      <div style={contentStyle}>
                      {groupedSchedule[day].map((plan, planIndex) => (
                        <div key={planIndex} className="card mb-4" style={{ marginBottom: '10px', width: '500px', height: '160px' ,  boxShadow: '4px 4px 6px rgba(0, 0, 0, 0.1)', marginLeft: '10px' }}>
                          <div className="row">
                            <div className="col-md-4">
                              <img src={plan.firstimage} className="card-img" alt={plan.name} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                            </div>
                            <div className="col-md-8">
                              <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', }}>
                                <div>
                                  <h5 className="card-title"><b style={{ fontSize: '17px', margin: 1 }}>{plan.sight_name}</b></h5>
                                  <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <ThemeTag theme={plan.theme} style={{ marginRight: '5px' }}>{plan.theme}</ThemeTag>
                                    <TypeTag type={plan.type}> {plan.type} </TypeTag>
                                    {/* <p className="card-text" style={{ fontSize: '14px', margin: 1 }}>{plan.type}</p> */}
                                  </div>
                                  <p className="card-text" style={{ fontSize: '12px', margin: 1 }}>📌 : {plan.address1 === '없음' ? plan.address2 : plan.address1}</p>
                                  <p className="card-text" style={{ fontSize: '12px', margin: 1 }}>⭐{plan.rating} ✏️{plan.review}</p>
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
            </Container>
          </div>
          <div className="col-md-6">
            <MapContainer>
              <div style={{marginBottom: '20px'}}>
              <div className="card" style={smallcardStyle}>
                <br />
                <h4 style={{ textAlign: 'left', color: '#ff9800', marginLeft: '20px' }}><b>선택 일정</b></h4>
                <hr/>
                <div className="card-body">
                  <ul>
                    <li>✈️여행기간: {resultdata.startDate} ~ {resultdata.endDate}</li>
                    <li>🏠숙소: {resultdata.accommodation ? JSON.parse(resultdata.accommodation).join(', ') : '숙소 정보가 없습니다'}</li>
                  </ul>
                </div>
              </div>
              </div>
              {/* <div><p>Day1의 시작장소: 제주공항</p></div> */}
              <ListMapWrapper>
                <div id="map" style={{ width: "100%", height: "500px" }}></div>
              </ListMapWrapper>
            </MapContainer>
          </div>
        </div>
      </div>
    );
};

export default PlanDetail;

const cardStyle = {
  width: '550px',
  height: '600px',
  margin: '0 auto',
  backgroundColor: '#f4f4f3',
  borderRadius: '8px',
  zIndex: '1',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '100px',
  boxShadow: '4px 15px 6px rgba(0, 0, 0, 0.1)',
};

const toolsStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '15px',
  borderRadius: '8px',
  background: '#454a50',
  marginTop: '-2px',
};

const cardContentStyle = {
  height: '100%',
  margin: '0px',
  borderRadius: '8px',
  background: '#f4f4f3',
  padding: '10px',
};

const contentStyle = {
  marginTop: '10px',
  fontSize: '14px',

};

const smallcardStyle = {
  height: '85%%',
  backgroundColor: '#fff',
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.1)'
};

const ThemeTag = styled.div`
  background-color:${({ theme }) => themeColors[theme] || 'gray'};
  font-size: 12px;
  border-radius: 5px; 
  color: white;
  padding: 5px 10px;
  margin: 10px;
  display: inline-block;
`;

const themeColors = {
  '관광지': '#ff9800',
  '체험/액티비티': '#E64B3B',
  '자연': '#2ECC70',
  '문화/예술/역사': '#7CAEE0',
  '맛집': '#EF88BE',
  '소품샵': '#9A58B5',
  '반려동물': '#3397DA',
};

const TypeTag = styled.div`
  background-color: ${({ type }) => (type === '없음' ? 'transparent' : '#94A5A6')};   
  font-size: 12px;
  border-radius: 5px;
  color: white;
  padding: 5px 10px;
  margin: 10px;
  display: inline-block;
`;