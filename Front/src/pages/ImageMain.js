// import * as React from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import FormControl from '@mui/material/FormControl';
// import NativeSelect from '@mui/material/NativeSelect';
// import SearchIcon from '@mui/icons-material/Search';
// import { IconButton } from '@mui/material';
// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import React from 'react';
import ImageSlider from './ImageSlider';

function Main() {
    // const [keyword, setKeyword] = useState('');
    // const [results, setResults] = useState([]);
    // const [searched, setSearched] = useState(false);  // 검색 여부 저장 상태
    // const [category, setCategory] = useState('none');
    // const navigate = useNavigate;

    // console.log(results)
    // console.log(searched)

    // const handleCategoryChange = (event) => {
    //     setCategory(event.target.value);
    // };

    // const handleSearch = async () => {
    //     try {
    //         const response = await axios.get(`http://localhost:8080/search?keyword=${keyword}`);
    //         console.log(response.data);   // 로그 추가
    //         setResults(response.data);
    //         setSearched(true);  // 검색이 완료됨을 표시
    //         navigate('/searchresults');
    //     } catch (error) {
    //         console.error(error);        }
    // };

    
    return (
        // <div style={{margin: 20, padding: 20, textAlign: 'center'}}>
        //     <Box
        //         component="form"
        //         sx={{
        //             '& .MuiTextField-root': { m: 1, width: '50%' },
        //         }}
        //         noValidate
        //         autoComplete="off"
        //     >
        //     {" "}
        //     <FormControl sx={{m: 1, minWidth: 120}}>
        //         <NativeSelect
        //             value={category}
        //             onChange={handleCategoryChange}
        //             // defaultValue={"none"}
        //             inputProps={{
        //                 name: 'category',
        //                 id: 'uncontrolled-native',
        //             }}
        //         >
        //             <option value={"none"}>통합검색</option>
        //             <option value={"region"}>지역별 검색</option>
        //             <option value={"theme"}>테마별 검색</option>
        //         </NativeSelect>
        //     </FormControl>
        //     <TextField id="standard-search" type="search" variant="standard" value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
        //     <IconButton type="submit" sx={{p: "10px"}} aria-label="search" onClick={handleSearch}><SearchIcon /></IconButton>
        //     {/* 결과를 화면에 표시 */}
        //     {searched && (
        //     <ul>
        //         {results.map((item) => (
        //             <li key={item.culture_id}>{item.name}</li>
        //         ))}
        //     </ul>
        //     )}
        //     </Box>
        // </div>
        <div>
            <ImageSlider />
        </div>
    );
}

export default Main;