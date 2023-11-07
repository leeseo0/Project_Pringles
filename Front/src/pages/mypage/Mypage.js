import { IconButton } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Link, useNavigate } from "react-router-dom";
import Sidebar from './Sidebar';
import "../../style/Mypage.css"

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

    const shareOnClick = () => {
        navigate('/share');
    }

    
    // style
    const StyleButton = {
        margin: 'auto',
        // height: '70px',
        // borderInlineColor: 'darkslategray',
        // borderInlineWidth: '2.5px',
        fontSize: '16px',
        fontWeight: 'bold'
    }

    const StyleDiv = {
        height: '300px',
        border: '1px solid lightgray',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow:'3px 3px 8px rgba(0,0,0,0.2)'
    }

    return (
        <div>
            <h3 style={{fontSize:'30px'}}><b>마이페이지</b></h3>
            <br/>
            <div style={{display: 'flex'}}>
                <Sidebar />
                <div className="container" style={{marginLeft:'20px'}}>
                    {/* <div className="text-center" style={{position:'sticky', top: '0'}}>
                        <h5><b>{window.localStorage.getItem("username")}님</b></h5>
                        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <Link to="/mypage/modify" style={{textDecoration:"none", color:"black"}}>회원 정보 수정</Link>
                            <IconButton sx={{p:"8px"}} onClick={() => navigate('/mypage/modify')}><EditOutlinedIcon/></IconButton>
                        </div>
                    </div>
                    <hr/> */}
                    <br/>
                    <div style={{marginTop:'100px', display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
                        <div style={{width: '45%'}}>
                            <h4 style={{fontWeight:'bold', fontSize:'27px', marginBottom:'20px'}}><b>나의 일정</b></h4>
                            <div className="text-center" style={StyleDiv}>
                                <button onClick={planOnClick} className='fancy' style={StyleButton}>
                                    <span className="top-key"></span>
                                    <span className="text">전체 일정 목록</span>
                                    <span className="bottom-key-1"></span>
                                </button>
                                {/* <button onClick={recordOnClick} className='btn btn-outline btn-sm' style={StyleButton}>여행 기록</button> */}
                            </div>
                        </div>
                        <div style={{width: '45%'}}>
                            <div>
                            <h4 style={{fontWeight:'bold', fontSize:'27px', marginBottom:'20px'}}><b>나의 활동</b></h4>
                            <div className="text-center" style={StyleDiv}>
                                <button onClick={bookmarkOnClick} className='fancy' style={StyleButton}>
                                    <span className="top-key"></span>
                                    <span className="text">찜</span>
                                    <span className="bottom-key-1"></span>
                                </button>
                                <button onClick={shareOnClick} className='fancy' style={StyleButton}>
                                    <span className="top-key"></span>
                                    <span className="text">공유 게시판</span>
                                    <span className="bottom-key-1"></span>
                                </button>
                                {/* <button onClick={bookmarkOnClick} className='mypage-btn btn btn-outline btn-sm' style={StyleButton}><span>찜</span></button>
                                <button onClick={shareOnClick} className='mypage-btn btn btn-outline btn-sm' style={StyleButton}><span>공유 게시판</span></button> */}
                                {/* <button onClick={reviewOnClick} className='btn btn-outline btn-sm' style={StyleButton}>리뷰</button> */}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyPage;