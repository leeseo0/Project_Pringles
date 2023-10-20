import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import kakao from './kakao_login.png'
// import { KAKAO_AUTH_URL } from "./OAuth";

const loginStyle = {
    textAlign: 'center',
};
  
const loginLinkStyle = {
    color: '#ff9800',
};

const cardStyle = {
    border: '1px solid #ccc', // 테두리 스타일
    boxShadow: '5px 5px 4px rgba(0, 0, 0, 0.1)', // 그림자 스타일
    borderRadius: '5px', // 모서리 둥글게 만들기
    padding: '20px', // 내부 여백
    maxWidth: '500px', // 카드의 최대 너비
    margin: '0 auto', // 수평 가운데 정렬
    marginTop: '120px'
  };

const LoginButtonStyle = {
    backgroundColor: '#ff9800', // 버튼 배경색 변경
    color: 'white', // 버튼 텍스트 색상 변경
    width: '100%', // 버튼의 가로 크기 100%로 설정
    padding: '10px 0', // 위아래 패딩 추가
    border: 'none', // 테두리 제거
    borderRadius: '5px', // 모서리 둥글게 만들기
    cursor: 'pointer', // 포인터 커서 스타일
    marginBottom: '20px'
};

function Login({isLogin, setIsLogin}) {

    const [userid, setUserid] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    function onChange(event) {
        if (event.target.name === "userid") {
            setUserid(event.target.value)
        } else if (event.target.name === "password") {
            setPassword(event.target.value)
        }
    }

    async function onSubmit(event) {
        event.preventDefault();

        const newErrorMessages = [];
        if (userid === "") {
            newErrorMessages.push("아이디를 입력하세요.");
        }
        if (password === "") {
            newErrorMessages.push("비밀번호를 입력하세요.");
        }

        setErrorMessage(newErrorMessages);

        if (newErrorMessages.length === 0) {

            try {

                const result = await axios.post("http://localhost:8080/login", {
                    userid: userid,
                    password: password
                })
                if (result.status === 200) {
                    console.log(result);
                    setIsLogin(true);   // true로 설정하면 navbar의 로그인 버튼이 로그아웃으로 바뀜
                    window.localStorage.setItem("userid", result.data.userid);
                    window.localStorage.setItem("username", result.data.username);
                    navigate("/")
                }
            } catch(error) {
                if (error.response && error.response.data) {
                    setErrorMessage([error.response.data]);
                    setUserid("");
                    setPassword("");
                } else {
                    console.log(error);
                }
            }
        }

    }

    return (
        <div className="container my-3">
            {/* <div className="my-3 border-bottom">
                <h3><b>로그인</b></h3>
            </div> */}
            <div style={cardStyle}>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <form onSubmit={onSubmit} style={{width: '400px'}}>
                    {errorMessage.length > 0 &&
                        (<div className="alert alert-danger" role="alert">
                            {errorMessage.map((message, index) => (<div key={index}>{message}</div>))}
                        </div>)
                    }
                    <div style={{fontWeight: 'bold', color: '#454a50', fontSize: '20px', marginBottom:'10px'}}>Login</div>
                    <div className="form-floating mb-3">
                        <input onChange={onChange} type="text" className="form-control form-control-lg" id="userid" name="userid"></input>
                        <label className="form-label" htmlFor="userid"><b>아이디</b></label>
                    </div>
                    <br/>
                    <div className="form-floating mb-3">
                        <input onChange={onChange} type="password" className="form-control form-control-lg" id="password" name="password" autoComplete="current-password"></input>
                        <label className="form-label" htmlFor="password"><b>비밀번호</b></label>
                    </div>
                    <br />
                    <button type="sumbit" className="btn btn-primary" style={LoginButtonStyle}><b>Login</b></button>
                    <p style={loginStyle}> Don't you have an account? <Link to="/Signup" style={loginLinkStyle}>Sign up</Link> </p>
                </form>
            </div>
            {/* <div className="my-3">
                <a href={KAKAO_AUTH_URL} className="kakaobtn">
                    <img src={kakao}></img>
                </a>
            </div> */}
        </div>
        </div>
    )
}

export default Login;