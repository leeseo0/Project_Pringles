import React, { useEffect, useState, Link } from "react";
import { useLocation } from "react-router-dom";
import Container from "@mui/material/Container"
import { FormControl, NativeSelect } from "@mui/material";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import styled from "styled-components";
import Modal from "../components/Modal";
import axios from "axios";
import Kakao from "../components/Kakao"; 
import MapContainer from "../components/MapContainer";
import Pagination from "../components/Pagination";
import "../style/Sights.modul.css";

// import { ThemeTag, themeColors } from "../style/SightsStyles";


  
function Sights() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const initialSearchKeyword = searchParams.get('query');


    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    }

    // const [sightList, setSightList] = useEffect([]);
    const [sightList, setSightList] = useState([]);
    const [sightInfo, setSightInfo] = useState(
        {
            name: '',
            type: "",
            address1: "",
            address2: "",
            firstimage: "",
            name: "",
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


    useEffect(() => {
        async function getSightList() {
            try {
                const response = await axios.get("http://localhost:8080/get/sight")

                if (response.status === 200) {
                    console.log(response.data)
                    setSightList(response.data);
                    // console.log(sightList);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getSightList();
    }, []);

    // console.log("sightList",sightList)


    //검색어 초기화
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

    const [bookmarked, setBookmarked] = useState({});

    const toggleBookmark = (name) => {
        setBookmarked((prevState) => ({
        ...prevState,
        [name]: !prevState[name],
        }));
        console.log(`"${name}"의 북마크 상태가 변경되었습니다. 북마크 여부: ${!bookmarked[name]}`);
    };

    return (

        // <div>
        //     <div className="Message">
        //         <input
        //             type="text"
        //             className="MsgInput"
        //             placeholder="Search..."
        //             value={searchText}
        //             onChange={(e) => setSearchText(e.target.value)}
        //         />
        //         <button className="SendSVG"></button>
        //         <div className="l"></div>
        //      </div>

        
        ////검색창
            <div style={{ margin: 20, padding: 20, textAlign: 'center' }}>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '50%' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleFormSubmit}
                >
                    {" "}
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <NativeSelect
                            defaultValue={"none"}
                            inputProps={{
                                name: 'category',
                                id: 'uncontrolled-native',
                            }}
                        >
                            <option value={"none"}>통합검색 </option>
                            <option value={"region"}>지역별 검색</option>
                            <option value={"theme"}>테마별 검색</option>
                        </NativeSelect>
                    </FormControl>
                    <TextField
                        id="standard-search"
                        type="search"
                        variant="standard"
                        name='search'
                        value={searchKeyword}
                        onChange={(event) => setSearchKeyword(event.target.value)}
                    // onChange={handleSearchKeywordChange}
                    />
                    <IconButton type="submit" sx={{ p: "10px" }} aria-label="search" onClick={handleSearchSight}> <SearchIcon /> </IconButton>
                </Box>

                <Container>
                    <div className="row">
                        {filteredSights.length > 0 ? (
                            filteredSights.map((sight, index) => (
                                <div key={index} className="col-md-4">
                                    <div className="card mb-4" onClick={() => handleOpenModal(sight.name)}>
                                        <img
                                            src={sight.firstimage}
                                            className="card-img-top"
                                            alt="이미지"
                                            style={{ height: "300px", objectFit: "cover" }}
                                        />
                                        <div className="card-body">
                                            <h6 className="card-title" style={{ fontSize: "20px", fontWeight: "bold" }}>{sight.name}</h6>
                                            
                                            <p className="card-text">
                                                <ThemeTag theme={sight.theme}>{sight.theme}</ThemeTag>
                                                <br />
                                                ⭐ {sight.rating}
                                                ✏️ {sight.review}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-md-12">
                                <p>No results found.</p>
                            </div>
                        )}
                    </div>
                    {isOpen && (<Modal
                        open={isOpen}
                        onClose={() => {
                            setIsOpen(false);
                        }}
                        sightInfo={sightInfo}
                        />)}
                </Container>

                {/* <MapWrapper id="map">
                    <Kakao/>
                </MapWrapper> */}

                <MapContainer sightList={sightList} />



                    {/* {sightList.map((sight, index) => (
                        <div class="overlayWrap">
                        <img class="overlayImg" src={sight.firstimage} />
                        <div class="sightInfoWrap">
                            <h1 class="sightName">{sight.name}</h1>
                            <p class="accommRegion">{sight.address1}</p>
                        </div>
                        <div class="overlayArrow"></div>
                    </div>
                    ))
                    }; */}



                <hr />


                {/* 관광지 목록 */}
                <Container>
                    <div className="row">
                        {sightList.map((sight, index) => (
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
                                                    {/* 북마크 버튼
                                                    <Button
                                                        onClick={() => toggleBookmark(sight.name)}
                                                        style={{
                                                            backgroundColor: bookmarked[sight.name] ? "red" : "green",
                                                        }}
                                                    >
                                                        {bookmarked[sight.name] ? "북마크 제거" : "북마크 추가"}
                                                    </Button> */}
                                                    <span role="img" aria-label="bookmark">♥️</span>
                                                    <label className="heart-container">
                                                        <input
                                                            type="checkbox"
                                                            checked={bookmarked[sight.name]}
                                                            onChange={() => toggleBookmark(sight.name)}
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
                                                <Button onClick={() => handleOpenModal(sight.name)}>열기</Button>
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
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        // </div>
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
    '관광지': '#0077A2',
    '체험/액티비티': '#7FBD2C',
    '자연': '#FCA517',
    '문화/예술/역사': '#A01AA1',
    '맛집': '#FF0101',
    '소품샵': '#0D014D',
    '반려동물': '#ED157A',
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
    width: 50%;
    height: 400px;
`;

const ProductListMapWrapper = styled.div`
  position: sticky;
  top: 226px;
  left: 51%;
  width: calc(100% - 51%);
  height: calc(100vh - 220px);
`;