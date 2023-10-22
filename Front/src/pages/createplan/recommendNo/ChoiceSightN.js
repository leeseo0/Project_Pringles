import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SightMaps from "../../../components/SightMaps";
import styled from "styled-components";
import "../../../style/Paging.css";

function SightBoard({ sights, onSightDeselect }) {
    return (
        <div className="sight-board" style={{marginBottom:"20px"}}>
            <div className="card" style={smallcardStyle}>
                <br />
                <h4 style={{ textAlign: 'left', color: '#ff9800', marginLeft: '18px' }}><b>선택한 관광지</b></h4>
                <hr/>
                <div className="card-body">
                <ul>
                    {sights.map((sight) => (
                    <li key={sight.spotid}>
                        {sight.name}
                        <button style={rebuttonStyle} onClick={() => onSightDeselect(sight)}>
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

    const [sightList, setSightList] = useState([]);

    // 날짜 차이 일수 계산
    let diff = Math.abs(selectedEndDate - selectedStartDate)
    diff = Math.ceil(diff / (1000 * 60 * 60 * 24))
    let days = diff + 1
    console.log('diff:', diff)
    console.log('days:', days)

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
        if((3*days-2) > selectedSights.length || selectedSights.length > 3*days) {
            alert(`선택할 수 있는 관광지는 ${days*3 -2} ~ ${days*3}개까지 입니다.`)
        } else {
        navigate('/createplan/n/choicetransportation', { state: { selectedStartDate, selectedEndDate, selectedHostels, selectedRecommedYn: 'N', selectedSights } })
        }
    }

    // 선택 버튼 클릭 시 호출되는 함수
    const handleSightSelect = (sight) => {
        setSelectedSights([...selectedSights, sight]);
    }

    // 관광지 제거 함수
    const handleSightDeselect = (sight) => {
        const updatedSelectedSights = [...selectedSights];
        const index = updatedSelectedSights.findIndex((selected) => selected.spotid === sight.spotid);
        if (index !== -1) {
            updatedSelectedSights.splice(index, 1);
            setSelectedSights(updatedSelectedSights);
        }
    }
    console.log('확인')
    console.log(selectedSights)
    console.log(sightList)

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
                        <h3><b>관광지 선택하세요</b></h3>
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
                            maxHeight: '120vh' }}
                        >
                            {sights.map((sight, index) => ( 
                                <div key={index} className="card mb-4" style={{ 
                                    marginBottom: '10px',height: '175px' ,
                                    boxShadow: '0 4px 5px rgba(0, 0, 0, 0.1)',
                                }} >
                                    <div className="row">
                                        <div className="col-md-4">
                                            <img src={sight.firstimage} className="card-img" alt={sight.name}
                                                style={{
                                                    width: '100%', 
                                                    height: '175px', 
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <h5 className="card-title" style={{ fontSize: '20px', fontWeight: 'bold'  }}><b> {sight.name}</b></h5>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <ThemeTag theme={sight.theme} style={{ marginRight: '5px' }}>{sight.theme}</ThemeTag>
                                                        <TypeTag type={sight.type}> {sight.type} </TypeTag>
                                                    </div>
                                                    <p className="card-text" style={{ fontSize: '14px'}}> ⭐ {sight.rating} ✏️ {sight.review}</p>
                                                    <p className="card-text" style={{ fontSize: '13px' }}>
                                                        📌 {sight.address1 === "없음" ? sight.address2 : `${sight.address2}`}
                                                    </p>
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
                                <SightBoard sights={selectedSights} onSightDeselect={handleSightDeselect} />
                                <SightMaps sights={sights} currentPage={currentPage} pageSize={pageSize} onPageChange={handlePageChange} />
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
//   overflow-y: auto; /* 수직 스크롤이 필요하다면 추가 */
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
    marginLeft: '10px', // 왼쪽 여백 추가
    marginRight: '10px', // 오른쪽 여백 추가
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