import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SightMaps from "../../../components/SightMaps";
import styled from "styled-components";
import "../../../style/Paging.css";

function ChoiceSight() {
    const [sights, setSights] = useState([]);
    const [selectedSights, setSelectedSights] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);   // 현재 페이지
    const pageSize = 15;   // 페이지 크기
    const [totalPages, setTotalPages] = useState(0);   // 전체 페이지 수
    const navigate = useNavigate();

    // 선택한 날짜, 숙소, 추천여부 정보 읽어오기
    const location = useLocation();
    const { selectedStartDate, selectedEndDate, selectedHostels, selectedRecommedYn } = location.state;
    // const selectedStartDate = location.state.startDate;
    // const selectedEndDate = location.state.endDate;
    // const selectedHostels = location.state.selectedHostels;
    console.log('숙소:', selectedHostels)
    console.log('추천여부:', selectedRecommedYn)
    console.log('종료일:', selectedEndDate)
    console.log('관광지:', selectedSights)

    // 관광지 목록 호출
    useEffect(() => {
        console.log("겟할수있니?")
        // 서버에서 페이징된 숙소 목록을 가져오는 요청
        axios.get(`http://localhost:8080/createplan/choicesights?page=${currentPage}&size=${pageSize}`)
        // axios.get("http://localhost:8080/createplan/choicesights")
        .then((response) => {
            const {content, totalPages} = response.data;
            console.log(response.data);
            // setSights(response.data);
            setSights(content);
            setTotalPages(totalPages);
        })
        .catch((error) => {
            console.error('Error fetching data :', error)
        });

    }, [currentPage, pageSize]);


    // 페이지 번호 목록 생성
    const pageNumbers = [];
    for (let i = currentPage - 3; i <= currentPage + 3; i++) {
        if (i >= 0 && i < totalPages) {
            pageNumbers.push(i);
        }
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

    // 다음 페이지 이동 및 선택한 날짜, 숙소, 추천여부, 관광지 정보 전달
    const moveNextClick = () => {
        navigate('/createplan/n/choicetransportation', { state: { selectedStartDate, selectedEndDate, selectedHostels, selectedRecommedYn: 'N', selectedSights } })
    }

    // 선택 버튼 클릭 시 호출되는 함수
    const handleSightSelect = (sight) => {
        setSelectedSights([...selectedSights, sight]);
    }



    return (
        <div>
            <div className="card" style={cardStyle}>
                <div className="header" style={headerStyle}>
                <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/createplan')}>이전</button>
                        <h3><b>관광지 선택하세요</b></h3>
                        <button type="button" className="btn btn-outline-secondary" onClick={moveNextClick}>다음</button>
                    </div>
                </div>

                <div className="body" style={bodyStyle}>
                    <div className="row">
                        <div className="col-md-5" style={{ 
                            overflowY: 'auto', 
                            maxHeight: '70vh' }}
                        >
                            {sights.map((sight, index) => ( 
                                <div key={index} className="card mb-4" style={{ 
                                    marginBottom: '10px',height: '150px' ,
                                    boxShadow: '0 4px 5px rgba(0, 0, 0, 0.1)',
                                }} >
                                    <div className="row">
                                        <div className="col-md-4">
                                            <img src={sight.firstimage} className="card-img" alt={sight.name}
                                                style={{
                                                    width: '100%', 
                                                    height: '150px', 
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <h5 className="card-title" style={{ fontSize: '20px', fontWeight: 'bold'  }} ><b> {sight.name}</b></h5>
                                                    <p className="card-text"> ⭐ {sight.rating} ✏️ {sight.review}</p>
                                                    <p className="card-text" style={{ fontSize: '14px' }}> {sight.type} / {sight.theme}</p>
                                                    <p className="card-text" style={{ fontSize: '14px' }}>📌{sight.address2}</p>
                                                    
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
                                <SightMaps sights={sights} currentPage={currentPage} pageSize={pageSize} onPageChange={handlePageChange} />
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
  max-height: 70vh; /* 화면 높이보다 높아지지 않도록 설정 */

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