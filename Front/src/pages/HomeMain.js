import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import { useState } from 'react';

function HomeMain () {
    // 검색버튼 누르면 상세페이지로 넘어가는것
    const navigate = useNavigate();
    const [searchKeyword, setSearchKeyword] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const searchKeyword = event.target.search.value;
        
        if (searchKeyword.trim() !== '') {
            navigate(`/sights?query=${searchKeyword}`);
        } else {
            alert('검색어를 입력해주세요.');
        }
        

    };

    return (
        <div style={{margin: 20, padding: 20, textAlign: 'center'}}>
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
            <FormControl sx={{m: 1, minWidth: 120}}>
                <NativeSelect
                    defaultValue={"none"}
                    inputProps={{
                        name: 'category',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option value={"none"}>통합검색</option>
                    <option value={"region"}>지역별 검색</option>
                    <option value={"theme"}>테마별 검색</option>
                </NativeSelect>
            </FormControl>
            <TextField 
                id="standard-search" type="search" 
                variant="standard" name='search' 
                value={searchKeyword} onChange={(event) => setSearchKeyword(event.target.value)} 
            />
            <IconButton type="submit" sx={{p: "10px"}} aria-label="search"> <SearchIcon /> </IconButton>
            {/* onClick={handleSearchClick} */}
            </Box>
        </div>
    );
}

export default HomeMain;