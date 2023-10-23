import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo8 from "./images/logo8.png"


function Navbar({isLogin, setIsLogin}) {
    const location = useLocation();

    const [userid, setUserid] = useState("")

    console.log("isLogin : " + isLogin);
    const navigate = useNavigate();

    const [isNavOpen, setIsNavOpen] = useState(false);
    const navbarRef = useRef(null);

    // Navbar 외부 클릭했을 때 토글 닫기
    useEffect(() => {
        function handleClickOutside(event) {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                setIsNavOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // 로그아웃 시 localstorage에서 userid와 username 정보 삭제
    function logout() {
        window.localStorage.removeItem("userid");
        window.localStorage.removeItem("username");
        setIsLogin(false);
        navigate("/")
    }

    // 일정 만들기 메뉴 클릭했을 때, 로그인 유무에 따라 다른 화면
    function plan() {
        if(isLogin === true) {
            navigate('/createplan');
        } else {
            alert("로그인이 필요합니다.");
            navigate('/login');
        }
    }

    function isActive(path) {
        return location.pathname === path;
    }

    const activeStyle = {
        textDecoration:'none',
        color: "#F78535",
        fontSize:'18px',
        fontWeight: 700
    }

    return (
        <nav ref={navbarRef} className="navbar navbar-expand-lg navbar-light bg-light border-body">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={logo8} alt="" width="105" height="36"/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setIsNavOpen(!isNavOpen)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse justify-content-end ${isNavOpen ? "show" : ""}`} id="navbarSupportedContent">
                    <ul className="navbar-nav" style={{fontSize:'18px', fontWeight:'bold', color:'#454a50', alignItems:'center'}}>
                        {/* 로그인 상태면 회원가입 메뉴 미표시 */}
                        {!isLogin && 
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/signup">회원가입</Link>
                        </li>
                        }
                        <li className="nav-item">
                            {isLogin ? (
                                <button className="nav-link active" onClick={logout}>로그아웃</button>
                            ) : (
                                <Link className="nav-link active" to="/login">로그인</Link>
                            )}
                        </li>
                        {/* 로그인 상태일때만 마이페이지 메뉴 표시 */}
                        {isLogin &&
                        <li className="nav-item" >
                            <NavLink className="nav-link active" aria-current="page" style={({isActive}) => (isActive ? activeStyle : {color:"#454a50", textDecoration:"none", fontSize:"18px", fontWeight:'bold'})} to="/mypage">마이페이지</NavLink>
                        </li>
                        }
                        <li className="nav-item">
                            <button className="nav-link active" onClick={plan} style={isActive("/createplan") ? activeStyle : {color:'#454a50'}}>일정 만들기</button>
                            {/* <NavLink className="nav-link active" onClick={plan} aria-current="page" style={({isActive}) => (isActive ? activeStyle : {color:"#454a50", textDecoration:"none", fontSize:"18px", fontWeight:'bold'})} to="/createplan">일정 만들기</NavLink> */}
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" style={({isActive}) => (isActive ? activeStyle : {color:"#454a50", textDecoration:"none", fontSize:"18px", fontWeight:'bold'})} to="/qna">QnA</NavLink>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;