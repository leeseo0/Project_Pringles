import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import SelectedsightMaps from "../../../components/SelectedsightMap";
import "../../../style/Paging.css";
import styled from "styled-components";
// import React, { useState, useEffect } from "react";

function ChoiceSight() {
    // const [sights, setSights] = useState([]);
    const [selectedSights, setSelectedSights] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);   // 현재 페이지
    const [pageSize] = useState(15);   // 페이지 크기
    const [totalPages, setTotalPages] = useState(0);   // 전체 페이지 수
    const navigate = useNavigate();

    // 선택한 날짜, 숙소, 추천여부, 가중치 정보 읽어오기
    const location = useLocation();
    const {selectedStartDate, selectedEndDate, selectedHostels, selectedRecommedYn, inputPriceWeight, inputRatingWeight, inputReviewWeight} = location.state;
    // const selectedStartDate = location.state.startDate;
    // const selectedEndDate = location.state.endDate;
    // const selectedHostels = location.state.selectedHostels;
    console.log(selectedHostels)
    console.log('추천여부:', selectedRecommedYn)
    console.log('가격 가중치: ', inputPriceWeight)

    const [sightList, setSightList] = useState([]);

    // weightdata = {}
    // weightdata = {priceweight:parseFloat(inputPriceWeight),ratingweight:parseFloat(inputRatingWeight),reviewweight:parseFloat(inputReviewWeight)}
    // 관광지 목록 호출
    // setCurrentPage(1)
    // console.log({priceweight:parseFloat(inputPriceWeight),ratingweight:parseFloat(inputRatingWeight),reviewweight:parseFloat(inputReviewWeight)})
    useEffect(() => {
        // fast api서버에서 페이징된 숙소 목록을 가져오는 요청
        axios.post("http://localhost:8000/recommendations",{priceweight:parseFloat(inputPriceWeight),ratingweight:parseFloat(inputRatingWeight),reviewweight:parseFloat(inputReviewWeight), pagenum:currentPage})
            .then((response) => {  
                const data = response.data.destinations
                console.log('senddata')
                console.log(response.data)
                setSightList(data)
                setTotalPages(response.data.total_num)
            })
            .catch((error) => {
                console.error("데이터 불러오기 오류:", error);
            });
        }, [currentPage,pageSize]);

        
    const { kakao } = window;

    useEffect(() => {
        if (window.kakao && window.kakao.maps && sightList.length > 0) {
            const container = document.getElementById("map");
            const options = {
                center: new window.kakao.maps.LatLng(33.36167, 126.52917),
                level: 10
            };
    
            const map = new window.kakao.maps.Map(container, options);
    
            sightList.forEach((spot) => {
                if (spot[0][13] && spot[0][14]) {
                // 새로운 좌표를 설정
                const newMarkerPosition = new window.kakao.maps.LatLng(spot[0][13], spot[0][14]);
                const marker = new window.kakao.maps.Marker({
                    position: newMarkerPosition, // 새로운 좌표로 마커 생성
                });
                    
                marker.setMap(map);
    
                // 커스텀 오버레이 내용
                const content = `
                    <div class="customoverlay">
                    <div class="body">${spot[0][2]}</div>
                    </div>
                `;
    
                const position = new kakao.maps.LatLng(spot[0][13], spot[0][14]);
    
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
        
        }, [sightList]);


    // 페이지 번호 목록 생성
    const pageNumbers = [];
    let total_num = Math.ceil(totalPages/10)
    for (let i = 0 ; i <= total_num; i++) {
        pageNumbers.push(i);
    }

    // 페이지 번호 이전으로 이동
    const moveToPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    // 페이지 번호 다음으로 이동
    const moveToNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

    // 페이지 변경 함수
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    }

    // 다음 페이지 이동 및 선택한 날짜, 숙소, 추천여부, 가중치, 관광지 정보 전달
    const moveNextClick = () => {
        navigate('/createplan/y/choicetransportation', {state: {selectedStartDate, selectedEndDate, selectedHostels, selectedRecommedYn : 'Y', inputPriceWeight, inputRatingWeight, inputReviewWeight, selectedSights}})
    }

    // 선택 버튼 클릭 시 호출되는 함수
    const handleSightSelect = (sight) => {
        setSelectedSights([...selectedSights, sight]);
    }
    console.log('kj')
    console.log(sightList)
    return (  
        <div>
            <div className="card" style={cardStyle}>
                <div className="header" style={headerStyle}>
                    <br/>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/createplan')}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 40" height="20" width="20" 
                                class="button">
                            <path d="M16 37L4 20 16 3" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"
                            stroke-linejoin="round" opacity="0.8" />
                            </svg>
                        </button>
                        <h2><b>관광지 선택</b></h2>
                        <button type="button" className="btn btn-outline-secondary" onClick={moveNextClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 40" height="20" width="20" 
                                class="button">
                                <path d="M4 37l12-17L4 3" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"
                                stroke-linejoin="round" opacity="0.8" />
                            </svg>
                        </button>

                    </div>
                    
                </div>
            </div>

            <div className="card-body" style={bodyStyle}>
                <div className="row">
                    <div className=" col-md-5" style={{
                        overflow: 'auto',
                        maxHeight: '70vh',
                    }}>
                    
                    {sightList.map((sight, index) => (
                        <div key={index} className="card mb-4" style={{ 
                            marginBottom: '10px', height: '150px' ,
                            boxShadow: '0 4px 5px rgba(0, 0, 0, 0.1)',
                            }} >
                            <div className="row">
                                <div className="col-md-4">
                                    <img src={sight[0][12]} className="card-img" alt={sight[0][2]}
                                        style={{
                                            width: '100%', // 이미지 너비를 100%로 설정
                                            height: '150px', // 이미지 높이를 100%로 설정
                                        }}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <h5 className="card-title"><b>{sight[0][2]}</b></h5>
                                            <p className="card-text">{sight[0][3]}</p>
                                            <p className="card-text">📌 {sight[0][4] == '없음' ? sight[0][5] : sight[0][4]}</p>
                                            <p className="card-text">⭐ {sight[0][6]} ✏️ {sight[0][7]}</p>
                                        </div>
                                        <button
                                            style={{position: 'absolute', top: '10px', right: '10px', borderRadius: '5px', borderColor: 'lightgray' }}
                                            className='btn btn-outline-secondary'
                                            onClick={() => handleSightSelect(sight)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>

                    <div className="col-md-7">
                        <ListMapWrapper>
                            <div id="map" style={{ width: '100%', height: '500px' }} sightList={sightList} currentPage={currentPage} pageSize={pageSize} onPageChange={handlePageChange} />
                        </ListMapWrapper>
                    </div>

                </div>
                <div className="pagination-wrapper text-center">
                    <ul className="pagination pagination-warning d-inline-flex">
                        <li className={`page-item ${currentPage === 0 ? "disabled" : ""} ${currentPage === 0 ? "first-child" : ""}`}>
                            <a className="page-link" onClick={moveToPreviousPage} disabled={currentPage === 0}>
                                <i class="fa fa-angle-left">
                                    {"‹"} 
                                </i>
                            </a>
                        </li>
                        {pageNumbers.map((page) => (
                            <li key={page} className={`page-item ${page === currentPage ? "active" : ""}`}>
                            <a className="page-link" onClick={() => handlePageChange(page)}>{page + 1}</a>
                        </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages - 1 ? "disabled" : ""} ${currentPage === totalPages - 1 ? "last-child" : ""}`}>
                            <a className="page-link" onClick={moveToNextPage} disabled={currentPage === totalPages - 1}>
                                <i class="fa fa-angle-right">
                                    {"›"}
                                </i>   
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
  



    )
}

export default ChoiceSight;


const ListMapWrapper = styled.div`
position: sticky;
  top: 0;
  left: 51%;
  margin:0
  width: calc(100% - 45%);
  height: 100%;
  overflow-y: auto; /* 수직 스크롤이 필요하다면 추가 */
  max-height: 70vh; 

`;

const cardStyle = {
    // width: '100%',
    height: '85%%',
    backgroundColor: '#fff',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    borderRadius: '10px',
    overflow: 'hidden',
    // marginTop: '5%', // 카드 위쪽 마진
  };

  const headerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '5px',
    textAlign: 'center',
    fontSize: '14px',
  };

  const bodyStyle = {
    padding: '20px',

  };