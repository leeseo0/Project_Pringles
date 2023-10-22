import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HotelMap from "../../components/HotelMap";
import styled from "styled-components";
import "../../style/Paging.css";

function HostelBoard({ hostels, onHostelDeselect }) {
    return (
        <div className="hostel-board" style={{marginBottom:"20px"}}>
            <div className="card" style={smallcardStyle}>
                <br />
                <h4 style={{ textAlign: 'left', color: '#ff9800', marginLeft: '20px' }}><b>선택한 숙소</b></h4>
                <hr/>
                <div className="card-body">
                <ul>
                    {hostels.map((hostel) => (
                    <li key={hostel.hostel_id}>
                        {hostel.name}
                        {/* <button style={removeButtonStyle} onClick={() => onHostelDeselect(hostel)}>제거</button> */}
                        <button style={rebuttonStyle} onClick={() => onHostelDeselect(hostel)}>
                            <svg viewBox="0 0 448 512" style={svgIconStyle}><path style={svgIconPathStyle} d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                        </button>
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
                        <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/createplan')}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 40" height="20" width="20" 
                                class="button">
                            <path d="M16 37L4 20 16 3" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"
                            stroke-linejoin="round" opacity="0.8" />
                            </svg>
                             </button>
                        <h3><b>숙소를 선택하세요</b></h3>
                        <button type="button" className="btn btn-outline-secondary" onClick={moveNextClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 40" height="20" width="20" 
                                class="button">
                                <path d="M4 37l12-17L4 3" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"
                                stroke-linejoin="round" opacity="0.8" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="body" style={bodyStyle}>

                    {/* <div className="row">
                            <div className="col-md-6">
                                " 검색/필터링"
                            </div>
                            <div className=" col-md-6">
                                "사용자 선택"
                            </div>
                            
                    </div>     */}
                    <div className="row">
                        <div className="col-md-5" style={{ 
                            overflowY: 'auto', 
                            maxHeight: '120vh' 
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
                            <li className={`page-item ${currentPage >= 10 ? "" : "disabled"}`}>
                                <a className="page-link" onClick={() => handlePageChange(currentPage - 10)} disabled={currentPage < 10}>
                                    {"‹‹"}
                                </a>
                            </li>
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
                            <li className={`page-item ${currentPage <= totalPages - 11 ? "" : "disabled"}`}>
                                <a className="page-link" onClick={() => handlePageChange(currentPage + 10)} disabled={currentPage > totalPages - 11}>
                                    {"››"}
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
//   overflow-y: auto; /* 수직 스크롤이 필요하다면 추가 */

`;


const cardStyle = {
    // width: '100%',
    height: '100%',
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

  const smallcardStyle = {
    height: '85%%',
    backgroundColor: '#fff',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.1)'
  };

  const rebuttonStyle = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#ff9800',
    border: 'none',
    fontWeight: 600,
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.164)',
    cursor: 'pointer',
    transitionDuration: '0.3s',
    overflow: 'hidden',
    position: 'relative',
    marginLeft: '5px',
  };
  
  const svgIconStyle = {
    width: '12px',
    transitionDuration: '0.3s',
  };
  
  const svgIconPathStyle = {
    fill: 'white',
  };
