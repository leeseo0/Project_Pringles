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
// import { ThemeTag, themeColors } from "../style/SightsStyles";




function generateRatingStars(rating) {
    const stars = "⭐".repeat(Math.round(rating));
    return stars;
}



function Sights() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const initialSearchKeyword = searchParams.get('query');

    const [name, setName] = useState('');

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



    return (


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

            {/* <Container>
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
                                        {isOpen && (<Modal
                                            open={isOpen}
                                            onClose={() => {
                                                setIsOpen(false);
                                            }}
                                            sightInfo={sightInfo}
                                        />)}
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
            </Container> */}

            <hr />


            {/* 관광지 목록 */}
            <Container>
                <div className="row">
                    {sightList.map((sight, index) => (
                        <div key={index} className="col-md-4">
                            <div className="card mb-4" onClick={() => handleOpenModal(sight.name)}>
                                <img
                                    src={sight.firstimage}
                                    className="card-img-top"
                                    alt="이미지"
                                    style={{ height: "250px", objectFit: "cover" }}
                                />
                                <div className="card-body">
                                    <h6 className="card-title" style={{ fontSize: "20px", fontWeight: "bold" }}>{sight.name}

                                    </h6>

                                    <p className="card-text" >
                                        <ThemeTag theme={sight.theme}>{sight.theme}</ThemeTag>
                                        <br />
                                        ⭐ {sight.rating}
                                        ✏️ {sight.review}
                                        <br />
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






        </div>

    );
}

export default Sights;


// const SightsList = styled.div`
//   display: flex;
//   flex-wrap: wrap;
// //   justify-content: space-between;
// `;

// const SightsCard = styled.div`
//   width: 200px;
//   border: 2px solid #ccc;
//   margin: 10px;
//   padding: 10px;
//   text-align: center;
//   background-color: #fff;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   display: flex;
//   flex-direction: column; 
// `;

// const SightsImage = styled.img`
//   max-width: 100%;
//   height: auto;
//   flex: 1;
// `;


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
