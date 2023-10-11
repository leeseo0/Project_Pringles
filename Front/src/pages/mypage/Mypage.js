import { IconButton } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Link, useNavigate } from "react-router-dom";

function MyPage() {
    
    const navigate = useNavigate();

    const planOnClick = () => {
        navigate('/mypage/planlist');
    }

    const recordOnClick = () => {
        navigate('/mypage/record');
    }

    const bookmarkOnClick = () => {
        navigate('/mypage/bookmark');
    }

    const reviewOnClick = () => {
        navigate('/mypage/review');
    }

    
    // style
    const StyleButton = {
        margin: 'auto',
        borderInlineColor: 'navy',
        borderInlineWidth: '2.5px',
        fontSize: '18px',
        fontWeight: 'bold'
    }

    const StyleDiv = {
        height: '300px',
        border: '1px solid lightgray',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }

    return (
        <div className="container my-3">
            <div className="container">
                <h3><b>마이페이지</b></h3>
                <div className="text-center">
                    <h5><b>{window.localStorage.getItem("username")}님</b></h5>
                    <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                        <Link to="/mypage/modify" style={{textDecoration:"none", color:"black"}}>회원 정보 수정</Link>
                        <IconButton sx={{p:"8px"}} onClick={() => navigate('/mypage/modify')}><EditOutlinedIcon/></IconButton>
                    </div>
                </div>
                <hr></hr>
            </div>
            <br/>
            <div className="container" style={{width:'45%', float:'left'}}>
                <div>
                    <h4><b>나의 일정</b></h4>
                    <div className="text-center" style={StyleDiv}>
                        <button onClick={planOnClick} className='btn btn-outline btn-sm' style={StyleButton}>전체 일정 목록</button>
                        <button onClick={recordOnClick} className='btn btn-outline btn-sm' style={StyleButton}>여행 기록</button>
                    </div>
                </div>
            </div>
            <div className="container" style={{width:'45%', float:'right'}}>
                <div>
                    <h4><b>나의 활동</b></h4>
                    <div className="text-center" style={StyleDiv}>
                        <button onClick={bookmarkOnClick} className='btn btn-outline btn-sm' style={StyleButton}>찜</button>
                        <button onClick={reviewOnClick} className='btn btn-outline btn-sm' style={StyleButton}>리뷰</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyPage;