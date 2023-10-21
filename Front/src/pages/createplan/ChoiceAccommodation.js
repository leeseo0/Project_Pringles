import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HotelMap from "../../components/HotelMap";
import styled from "styled-components";
import "../../style/Paging.css";

function HostelBoard({ hostels, onHostelDeselect }) {
    return (
        <div className="hostel-board" style={{marginBottom:"5px"}}>
            <div className="card" style={smallcardStyle}>
            <div className="header" style={headerStyle}>
                <br />
                <p style={{ textAlign: 'center' }}><b>선택한 숙소</b></p>
            </div>
                <div className="card-body">
                <ul>
                    {hostels.map((hostel) => (
                    <li key={hostel.hostel_id}>
                        {hostel.name}
                        <button style={removeButtonStyle} onClick={() => onHostelDeselect(hostel)}>제거</button>
                    </li>
                    ))}
                </ul>
                </div>
            </div>
            </div>
    );
  }

function ChoiceAccommodation() {
    const [hostels, setHostels] = useState([]);
    const [selectedHostels, setSelectedHostels] = useState([]);   // 선택된 숙소 저장
    const [currentPage, setCurrentPage] = useState(0);   // 현재 페이지
    const [pageSize] = useState(15);   // 페이지 크기
    const [totalPages, setTotalPages] = useState(0);   // 전체 페이지 수
    const navigate = useNavigate();

    // 선택한 날짜 정보 읽어오기
    const location = useLocation();
    // const {selectedStartDate, selectedEndDate} = location.state;
    const selectedStartDate = location.state ? location.state.startDate : new Date();
    const selectedEndDate = location.state ? location.state.endDate : new Date();

    // 숙소가 잘 선택되는지, 날짜가 잘 읽혀지는지 확인
    console.log('숙소:', selectedHostels)
    console.log('시작일:', selectedStartDate)

    // 날짜 차이 일수 계산
    let diff = Math.abs(selectedEndDate - selectedStartDate)
    diff = Math.ceil(diff / (1000 * 60 * 60 * 24))
    let days = diff + 1
    console.log('diff:', diff)
    console.log('days:', days)

    // 숙소 목록 호출
    useEffect(() => {
        // 서버에서 페이징된 숙소 목록을 가져오는 요청
        axios.get(`http://localhost:8080/createplan/choiceaccommodation?page=${currentPage}&size=${pageSize}`)
        // axios.get("http://localhost:8080/createplan/choiceaccommodation")
        .then((response) => {
            const {content, totalPages} = response.data;
            // console.log(response.data);
            // setHostels(response.data);
            setHostels(content);
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

    // 다음 페이지 이동 및 선택한 날짜, 숙소 정보 전달
    const moveNextClick = () => {
        if (selectedHostels.length > diff) {
            // 선택한 숙소의 개수가 diff를 초과하면 경고창 표시
            alert(`선택할 수 있는 숙소는 ${diff}개까지입니다.`);
        } else {
            navigate('/createplan/choicerecommedYN', { state: { selectedStartDate, selectedEndDate, selectedHostels } });
        }
    }
    

    // 숙소 선택 함수
    const handleHostelSelect = (hostel) => {
        setSelectedHostels([...selectedHostels, hostel]);
    }

    // 숙소 제거 함수
    const handleHostelDeselect = (hostel) => {
        // 선택한 숙소를 복제하여 새로운 배열 생성
        const updatedSelectedHostels = [...selectedHostels];
        // 선택한 숙소에서 주어진 숙소의 index를 찾음
        const index = updatedSelectedHostels.findIndex((selected) => selected.hostelid === hostel.hostelid);
        // index가 -1이 아니면 해당 숙소를 배열에서 제거
        if (index !== -1) {
            updatedSelectedHostels.splice(index, 1);
            // 새로운 배열로 선택한 숙소 목록을 업데이트
            setSelectedHostels(updatedSelectedHostels);
        }
    }

    return (
        <div>       
            <div className="card" style={cardStyle}>
                <div className="header" style={headerStyle}>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/createplan')}>이전</button>
                        <h3><b>숙소를 선택하세요</b></h3>
                        <button type="button" className="btn btn-outline-secondary" onClick={moveNextClick}>다음</button>
                    </div>
                </div>

                <div className="body" style={bodyStyle}>

                    <div className="row">
                            <div className="col-md-6">
                                " 검색/필터링"
                            </div>
                            <div className=" col-md-6">
                                "사용자 선택"
                            </div>
                            
                    </div>    
                    <div className="row">
                        <div className="col-md-5" style={{ 
                            overflowY: 'auto', 
                            maxHeight: '70vh' 
                            }}>
                            {hostels.map((hostel) => (
                                <div key={hostel.hostel_id} className="card mb-4" style={{ 
                                    marginTop: '10px', height: '150px' ,
                                    boxShadow: '0 4px 5px rgba(0, 0, 0, 0.1)',
                                    }}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <img src={hostel.firstimage} className="card-img" alt={hostel.name} style={{
                                                width: '100%',
                                                height: '150px',
                                            }} />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>

                                                    <h5 className="card-title" style={{ fontSize: '20px', fontWeight: 'bold'  }}><b>{hostel.name}</b></h5>
                                                    <p className="card-text" style={{ fontSize: '14px' }} >{hostel.type} ⭐{hostel.rating} ✏️{hostel.review} </p>  
               
                                                    <p className="card-text" style={{ fontSize: '14px' }}>📌 {hostel.address1}</p>
                                                </div>
                                                <button
                                                    style={{
                                                        position: 'absolute',
                                                        top: '10px',
                                                        right: '10px',
                                                        borderRadius: '5px',
                                                        borderColor: 'lightgray'
                                                    }}
                                                    className='btn btn-outline-secondary'
                                                    onClick={() => handleHostelSelect(hostel)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-md-1"> {/* 여백을 위한 추가된 열 */}
                            {/* 아무 내용도 없는 빈 열입니다. */}
                        </div>

                        <div className="col-md-6" >
                            <ListMapWrapper>
                                <HostelBoard hostels={selectedHostels} onHostelDeselect={handleHostelDeselect} />
                                <HotelMap hostels={hostels} currentPage={currentPage} pageSize={pageSize} onPageChange={handlePageChange} />
                            </ListMapWrapper>
                        </div> 
                    </div>
                    <div className="pagination-wrapper text-center">
                        <ul className="pagination pagination-warning d-inline-flex">
                            <li className={`page-item ${currentPage === 0 ? "disabled" : ""} ${currentPage === 0 ? "first-child" : ""}`}>
                                <a className="page-link" onClick={moveToPreviousPage} disabled={currentPage === 0}>
                                    <i class="fa fa-angle-left">{"‹"}</i>
                                </a>
                            </li>
                            {pageNumbers.map((page) => (
                                <li key={page} className={`page-item ${page === currentPage ? "active" : ""}`}>
                                    <a className="page-link" onClick={() => handlePageChange(page)}>{page + 1}</a>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages - 1 ? "disabled" : ""} ${currentPage === totalPages - 1 ? "last-child" : ""}`}>
                                <a className="page-link" onClick={moveToNextPage} disabled={currentPage === totalPages - 1}>
                                    <i class="fa fa-angle-right">{"›"}</i>
                                </a>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default ChoiceAccommodation;


const ListMapWrapper = styled.div`
  position: sticky;
  top: 0;
  left: 51%;
  margin:0
  width: calc(100% - 45%);
  height: 70vh;
  overflow-y: auto; /* 수직 스크롤이 필요하다면 추가 */

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

  const rebuttonStyle = {
    backgroundColor: "#ff9800",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const removeButtonStyle = {
    ...rebuttonStyle, // 공통 스타일을 불러옴
    backgroundColor: "#ff9800", // 버튼의 개별 스타일을 정의
    marginLeft: "2px",
  };

  const smallcardStyle = {
    height: '85%%',
    backgroundColor: '#fff',
    borderRadius: '10px',
    overflow: 'hidden',
  };