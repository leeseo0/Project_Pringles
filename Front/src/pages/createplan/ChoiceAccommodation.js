import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HotelMap from "../../components/HotelMap";
import styled from "styled-components";
import "../../style/Paging.css";

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
        navigate('/createplan/choicerecommedYN', {state: {selectedStartDate, selectedEndDate, selectedHostels}});
    }
    
    

    // 선택 버튼 클릭 시 호출되는 함수
    const handleHostelSelect = (hostel) => {
        setSelectedHostels([...selectedHostels, hostel]);
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


        // <div className=" card" style={cardStyle}>         
        //     <div className="header" style= {headerStyle}
        //     {{
        //             backgroundColor: '#333',
        //             borderRadius: '6px',
        //             color: '#fff',
        //             padding: '5px',
        //             textAlign: 'center',
        //             fontSize: '14px',
        //     }}
        //     >
        //         <br />
        //         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        //             <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/createplan')}>이전</button>
        //             <h3><b>숙소를 선택하세요</b></h3>
        //             <button type="button" className="btn btn-outline-secondary" onClick={moveNextClick}>다음</button>
        //         </div>
        //     </div>
            
        //         <div className="body" style={{
        //                 padding: '20px',
        //                 border: '1px solid #ccc', // 테두리 스타일 및 색상 설정
        //                 borderRadius: '5px',

        //             }}>

        //             <div className="row">
        //                 <div className="col-md-6">
        //                     " 검색/필터링"
        //                 </div>
        //                 <div className=" col-md-6">
        //                     "사용자 선택"
        //                 </div>
                        
        //             </div>    
        //             <div className="row">
        //                 <div className="col-md-5" style={{
        //                      padding: '20px',
        //                      border: '1px solid #ccc', // 테두리 스타일 및 색상 설정
        //                      borderRadius: '5px',
        //                      overflowY: 'auto', 
        //                      maxHeight: '70vh', // 테두리의 모서리 둥글기 조절
        //                 }}>
        //                     {hostels.map((hostel) => (
        //                         <div key={hostel.hostel_id} className="card mb-4" style={{ 
        //                             marginTop: '10px',
        //                             boxShadow: '0 4px 5px rgba(0, 0, 0, 0.1)',
        //                         }}>
        //                             <div className="card-body">
        //                                 <div className="row">
        //                                     <div className="col-md-4">
        //                                         <img src={hostel.firstimage} className="card-img" alt={hostel.name} style={{
        //                                             width: '100%',
        //                                             height: '130px',
        //                                         }} />
        //                                     </div>
        //                                     <div className="col-md-8">
        //                                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        //                                             <div>
        //                                                 <h5 className="card-title" style={{ fontSize: '20px', fontWeight: 'bold' }}><b>{hostel.name}</b></h5>
        //                                                 <p className="card-text" style={{ fontSize: '14px' }}>{hostel.type} ⭐{hostel.rating} ✏️{hostel.review} </p>
        //                                                 <p className="card-text" style={{ fontSize: '14px' }}>📌 {hostel.address1}</p>
        //                                             </div>
        //                                             <button
        //                                                 style={{
        //                                                     position: 'absolute',
        //                                                     bottom: '10px',
        //                                                     right: '10px',
        //                                                     borderRadius: '5px',
        //                                                     borderColor: 'lightgray'
        //                                                 }}
        //                                                 className='btn btn-outline-secondary'
        //                                                 onClick={() => handleHostelSelect(hostel)}
        //                                             >
        //                                                 +
        //                                             </button>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     ))}
        //                 </div>

        //                 <div className="col-md-7" >
        //                     <ListMapWrapper>
        //                         <HotelMap hostels={hostels} currentPage={currentPage} pageSize={pageSize} onPageChange={handlePageChange} />
        //                     </ListMapWrapper>
        //                 </div> 
        //             </div>

        //             <div className="pagination-wrapper text-center">
        //                 <ul className="pagination pagination-warning d-inline-flex">
        //                     <li className={`page-item ${currentPage === 0 ? "disabled" : ""} ${currentPage === 0 ? "first-child" : ""}`}>
        //                         <a className="page-link" onClick={moveToPreviousPage} disabled={currentPage === 0}>
        //                             <i class="fa fa-angle-left">{"‹"}</i>
        //                         </a>
        //                     </li>
        //                     {pageNumbers.map((page) => (
        //                         <li key={page} className={`page-item ${page === currentPage ? "active" : ""}`}>
        //                             <a className="page-link" onClick={() => handlePageChange(page)}>{page + 1}</a>
        //                         </li>
        //                     ))}
        //                     <li className={`page-item ${currentPage === totalPages - 1 ? "disabled" : ""} ${currentPage === totalPages - 1 ? "last-child" : ""}`}>
        //                         <a className="page-link" onClick={moveToNextPage} disabled={currentPage === totalPages - 1}>
        //                             <i class="fa fa-angle-right">{"›"}</i>
        //                         </a>
        //                     </li>
        //                 </ul>

        //             </div>
        //         </div>


            // {/* <div className="container">
            //     <div className="row">
            //         <div className="col-md-5">
            //             {hostels.map((hostel) => (
            //                     <div key={hostel.hostel_id} className="card mb-4" style={cardStyle}>
            //                         <div className="header" style={headerStyle} >  
            //                             <h3>{hostel.name}</h3>
            //                         </div>
            //                         <div className="row">
            //                             <div className="col-md-4">
            //                                 <img src={hostel.firstimage} className="card-img" alt={hostel.name} style={{
            //                                     width: '100%',
            //                                     height: '190px',
            //                                 }} />
            //                             </div>
            //                             <div className="col-md-8">
            //                                 <div className="card-body" style=
            //                                 {{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            //                                 {{bodyStyle}}
            //                                 >
            //                                     <div>
            //                                         <h5 className="card-title" style={{ fontSize: '20px' }}><b>{hostel.name}</b></h5>
            //                                         <p className="card-text" style={{ fontSize: '14px' }}>{hostel.type}</p>
            //                                         <p className="card-text" style={{ fontSize: '15px' }}>📌 {hostel.address1}</p>
            //                                         <p className="card-text">⭐{hostel.rating} ✏️{hostel.review}</p>
            //                                     </div>
            //                                     <button
            //                                         style={{
            //                                             position: 'absolute',
            //                                             bottom: '10px',
            //                                             right: '10px',
            //                                             borderRadius: '5px',
            //                                             borderColor: 'lightgray'
            //                                         }}
            //                                         className='btn btn-outline-secondary'
            //                                         onClick={() => handleHostelSelect(hostel)}
            //                                     >
            //                                         +
            //                                     </button>
            //                                 </div>
            //                             </div>
            //                         </div>
            //                     </div>
            //                 ))}
            //             <div className="pagination-wrapper text-center">
            //                 <ul className="pagination pagination-warning d-inline-flex">
            //                     <li className={`page-item ${currentPage === 0 ? "disabled" : ""} ${currentPage === 0 ? "first-child" : ""}`}>
            //                         <a className="page-link" onClick={moveToPreviousPage} disabled={currentPage === 0}>
            //                             <i class="fa fa-angle-left">{"‹"}</i>
            //                         </a>
            //                     </li>
            //                     {pageNumbers.map((page) => (
            //                         <li key={page} className={`page-item ${page === currentPage ? "active" : ""}`}>
            //                             <a className="page-link" onClick={() => handlePageChange(page)}>{page + 1}</a>
            //                         </li>
            //                     ))}
            //                     <li className={`page-item ${currentPage === totalPages - 1 ? "disabled" : ""} ${currentPage === totalPages - 1 ? "last-child" : ""}`}>
            //                         <a className="page-link" onClick={moveToNextPage} disabled={currentPage === totalPages - 1}>
            //                             <i class="fa fa-angle-right">{"›"}</i>
            //                         </a>
            //                     </li>
            //                 </ul>
            //             </div>
            //         </div>
            //     <div className="col-md-7" >
            //         <ListMapWrapper>
            //             <HotelMap hostels={hostels} currentPage={currentPage} pageSize={pageSize} onPageChange={handlePageChange} />
            //         </ListMapWrapper>
            //     </div> 
            //     </div>
            // </div>
            // <div className="container" style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px'}}>
            //     <button type="button" className="btn btn-outline-secondary" onClick={moveNextClick}>다음</button>
            // </div> */}

        // </div>
        // </div>


           
                    

    




        
        
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
