import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({isLogin, setIsLogin}) {

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

    function logout() {
        window.localStorage.removeItem("userid");
        window.localStorage.removeItem("username");
        setIsLogin(false);
        navigate("/")
    }

    function plan() {
        if(isLogin === true) {
            navigate('/createplan');
        } else {
            alert("로그인이 필요합니다.");
            navigate('/login');
        }
    }

    return (
        <nav ref={navbarRef} className="navbar navbar-expand-lg navbar-light bg-dark border-bottom border-body bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><b>Home</b></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setIsNavOpen(!isNavOpen)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse justify-content-end ${isNavOpen ? "show" : ""}`} id="navbarSupportedContent">
                    <ul className="navbar-nav">
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
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/mypage">마이페이지</Link>
                        </li>
                        }
                        <li className="nav-item">
                            <button className="nav-link active" onClick={plan}>일정 만들기</button>
                            {/* <Link className="nav-link active" aria-current="page" to="/plan">일정 만들기</Link> */}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/qna">QnA</Link>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;