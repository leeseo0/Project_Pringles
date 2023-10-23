import React, { useEffect, useState, Link } from "react";
import { useLocation } from "react-router-dom";
import Container from "@mui/material/Container"
import styled from "styled-components";
import Modal from "../components/Modal";
import axios from "axios";
import MapContainer from "../components/MapContainer";
// import Pagination from "../components/PaginationWrapper";
import SightMaps from "../components/SightMaps";
import "../style/Sights.modul.css";
import "../style/Paging.css";
import Plus from "../images/Plus.png"

// import { ThemeTag, themeColors } from "../style/SightsStyles";


function Sights() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const initialSearchKeyword = searchParams.get('query');

    const [sightList, setSightList] = useState([]);
    const [sightInfo, setSightInfo] = useState(
        {
            name: '',
            type: "",
            address1: "",
            address2: "",
            firstimage: "",
            newtype: "",
            placetime: "",
            price: "",
            rating: "",
            review: "",
            tel: "",
            theme: ""
        }
    );


    //모달
    const [isOpen, setIsOpen] = useState(false);

    async function handleOpenModal(sight_name) {
        try {
            const response = await axios.post('http://localhost:8080/get/sight',
                {
                    sightName: sight_name
                })

            if (response.status === 200) {
                console.log(response.data)
                setSightInfo(response.data)
                // console.log(sightInfo.name)
            }
        } catch (error) {
            console.log(error)
        }
        setIsOpen(true);
    };

    const [showCard, setShowCard] = useState(false);
    const [currentPage, setCurrentPage] = useState(null); // currentPage를 초기화
    const [pageSize] = useState(30); // 페이지 크기
    const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수


    // 전체 관광지 리스트 조회
    useEffect(() => {
        setCurrentPage(0)
    }, [])

    useEffect(() => {
        if (currentPage !== null) {
            async function getSightList() {
                try {
                    const response = await axios.get(`http://localhost:8080/get/sights?page=${currentPage}&size=${pageSize}`)
                    if (response.status === 200) {
                        console.log(response.data)
                        // setSightList(response.data);
                        if (currentPage === 0) {
                            setTotalPages(response.data.totalPages)
                        }
                        setSightList(response.data.content);
                        setShowCard(true);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            getSightList();
        }
    }, [currentPage, pageSize])
    
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const [pageNumbers,setPageNumbers] = useState([]);
    const [showPageNation, setShowPageNation] = useState(false);
    
    useEffect(() => {
        if (totalPages !== 0) {
            let arr = []
            for (let i = currentPage - 2; i <= currentPage + 3; i++) {
                if (i >= 0 && i < totalPages) {
                    arr.push(i);
                }
            }
            setPageNumbers(arr);
        }
    }, [totalPages, currentPage])
    
    useEffect(() => {
        if (pageNumbers.length === totalPages) {
            setShowPageNation(true);
        }
    }, [pageNumbers])

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
    

    // console.log("sightList",sightList)


    // 검색어 초기화
    // const [searchText, setSearchText] = useState('');

    const [searchKeyword, setSearchKeyword] = useState(initialSearchKeyword || '');
    // const [filteredAttractions, setFilteredAttractions] = useState([]);
    const [filteredSights, setFilteredSights] = useState([]);

    useEffect(() => {
        const filtered = sightList.filter(sights =>
            sights.name.includes(searchKeyword)
        );
        setFilteredSights(filtered);
    }, [searchKeyword]);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleSearchSight();
    };

    async function handleSearchSight() {
        const filtered = sightList.filter(sight => sight.name.includes(searchKeyword));
        setFilteredSights(filtered);
    }

    
    // 관광지 북마크 상태 토글
    const [bookmarked, setBookmarked] = useState({});

    // const toggleBookmark = (name) => {
    //     setBookmarked((prevState) => ({
    //     ...prevState,
    //     [name]: !prevState[name],
    //     }));
    //     console.log(`"${name}"의 북마크 상태가 변경되었습니다. 북마크 여부: ${!bookmarked[name]}`);
    // };

    const toggleBookmark = async (sightId) => {
        const isBookmarked = bookmarked[sightId];
        setBookmarked({
            ...bookmarked,
            [sightId]: !isBookmarked,
        });
    
        if (isBookmarked) {
            // 북마크 제거 요청
            try {
                const response = await axios.post(`http://localhost:8080/bookmark/remove/${window.localStorage.getItem("userid")}`, {
                    sightid: sightId,
                });
        
                if (response.status === 200) {
                    console.log(`Sight ID ${sightId}을 북마크에서 제거했습니다.`);
                }
            } catch (error) {
                console.error(error);
            };
        } else {
            // 북마크 추가 요청
            try {
                const response = await axios.post(`http://localhost:8080/bookmark/add/${window.localStorage.getItem("userid")}`, {
                    sightid: sightId,
                });
        
                if (response.status === 200) {
                    console.log(`Sight ID ${sightId}을 북마크에 추가했습니다.`);
                }
            } catch (error) {
                console.error(error);
            };
        }
    }; 


    // 테마별 변수 필터링
    // const handleFilterByTheme = async (selectedTheme) => {
    //     try {
    //       const response = await axios.get(`http://localhost:8080/get/sights?theme=${selectedTheme}`);
    //       if (response.status === 200) {
    //         console.log(response.data);
    //         setSightList(response.data); // 선택한 테마에 해당하는 목록으로 업데이트
    //         setShowCard(true);
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };


    const [selectedTheme, setSelectedTheme] = useState(null);
    const [filteredSightList, setFilteredSightList] = useState([]);

    const handleFilterByTheme = (theme) => {
        const filtered = sightList.filter((sight) => sight.theme === theme);
        setFilteredSightList(filtered);
      };

    const clearFilter = () => {
        setSelectedTheme(null);
    };
    // render 함수 내에서 sightList 또는 filteredSightList를 사용하도록 변경
    const sightsToDisplay = filteredSightList.length > 0 ? filteredSightList : sightList;

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [currentPage]); // currentPage가 변경될 때 스크롤 이동
      
    

    return (
        <div>
            <div style={{ margin: 20, padding: 20, textAlign: 'center' }}>
                <div style={{ marginBottom: "20px" }}>
                    {Object.keys(themeColors).map((theme) => (
                        <Button
                        key={theme}
                        onClick={() => handleFilterByTheme(theme)}
                        style={{ backgroundColor: themeColors[theme], color: 'white', margin: '5px' }}
                        >
                        {theme}
                        </Button>
                    ))}
                    <Button onClick={clearFilter} style={{ backgroundColor: 'gray', color: 'white', margin: '5px' }}>
                        모두보기
                    </Button>
                </div>
                <hr/>

                <Container>
                    <div className="row">
                        <MapWrapper>
                            <MapContainer sightList={sightList} currentPage={currentPage} pageSize={pageSize} onPageChange={handlePageChange} />
                        </MapWrapper>
                    </div>

                    <hr/>

                    <div className="row">
                        { showCard && 
                        sightList.map((sight, index) => (
                            <div key={index} className="col-md-4">
                                <div className="card mb-4">
                                    <img
                                        src={sight.firstimage}
                                        className="card-img-top"
                                        alt="이미지"
                                        style={{ height: "250px", objectFit: "cover" }}
                                        onClick={() => handleOpenModal(sight.name)}
                                    />
                                    <div className="card-body">
                                        <h6 className="card-title" style={{ fontSize: "20px", fontWeight: "bold" }}>{sight.name}</h6>
                                        <p className="card-text">
                                            <ThemeTag theme={sight.theme}>{sight.theme}</ThemeTag>
                                            <br />
                                            ⭐ {sight.rating}
                                            ✏️ {sight.review}
                                            <br />
                                                <div>
                                                    <span role="img" aria-label="bookmark">♥️</span>
                                                    <label className="heart-container">
                                                        <input
                                                            type="checkbox"
                                                            checked={bookmarked[sight.name]}
                                                            onChange={() => toggleBookmark(sight.sightid)}
                                                            className="checkbox"
                                                        />
                                                        <div className="svg-container">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="svg-filled" width="50" height="50" viewBox="0 0 24 24">
                                                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                                            </svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="svg-celebrate" width="50" height="50" viewBox="0 0 24 24">
                                                                <path d="M12 2C5.47 2 1 7.18 1 13.5c0 4.14 3.8 7.56 8.55 12.34C11.65 26.2 12 26.05 12 26s.35.2.45.84c4.75-4.78 8.55-8.2 8.55-12.34 0-6.32-4.47-11.5-11-11.5zm0 20c-2.94 0-5.78-.71-8.28-2 1.58-3.58 4.55-6.47 8.28-7.51 3.74 1.04 6.7 3.94 8.28 7.51-2.5 1.29-5.34 2-8.28 2z"/>
                                                            </svg>
                                                        </div>
                                                    </label>
                                                </div>

                                            <div>
                                                <button   className="btn" onClick={() => handleOpenModal(sight.name)}
                                                    style={{PlusButtonStyle}}
                                                    >
                                                    <div style={buttonContainerStyle}>
                                                        <img src={Plus}style={iconStyle} />
                                                    </div>
                                                </button>
                                            </div>
                                            
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {isOpen && (<Modal
                        open={isOpen}
                        onClose={() => {
                            setIsOpen(false);
                        }}
                        sightInfo={sightInfo}
                    />)}
                </Container>

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
    );
}

export default Sights;



const ThemeTag = styled.div`
    background-color:${({ theme }) => themeColors[theme] || 'gray'};
    font-size: 15px;
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

const Button = styled.button`
  font-size: 14px;
  padding: 10px 20px;
  border: none;
  background-color: #fa9f98;
  border-radius: 10px;
  color: white;
  font-style: italic;
  font-weight: 200;
  cursor: pointer;
  &:hover {
    background-color: #fac2be;
  }
`;

const MapWrapper = styled.div`
    width: 100%;
    height: 80%;
`;

const ProductListMapWrapper = styled.div`
  position: sticky;
  top: 226px;
  left: 51%;
  width: calc(100% - 51%);
  height: calc(100vh - 220px);
`;


const PlusButtonStyle = {
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center", // 세로 중앙 정렬을 위해 추가
    border: "none", // 테두리 제거
    padding: 0, // 패딩 제거
    backgroundColor: "transparent", // 배경색 제거
};

const iconStyle = {
    width: "25px",
    height: "25px",
};

const buttonContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
};