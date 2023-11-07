import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const signinStyle = {
    textAlign: 'center',
};
  
const signinLinkStyle = {
    color: '#ff9800',
};

const signinLinkHoverStyle = {
    textDecoration: 'underline',
};

const cardStyle = {
    border: '1px solid #ccc', // 테두리 스타일
    boxShadow: '5px 5px 4px rgba(0, 0, 0, 0.1)', // 그림자 스타일
    borderRadius: '5px', // 모서리 둥글게 만들기
    padding: '20px', // 내부 여백
    maxWidth: '500px', // 카드의 최대 너비
    margin: '0 auto', // 수평 가운데 정렬
    marginTop: '15px',
  };

const signupButtonStyle = {
    backgroundColor: '#ff9800', // 버튼 배경색 변경
    color: 'white', // 버튼 텍스트 색상 변경
    width: '100%', // 버튼의 가로 크기 100%로 설정
    padding: '10px 0', // 위아래 패딩 추가
    border: 'none', // 테두리 제거
    borderRadius: '5px', // 모서리 둥글게 만들기
    cursor: 'pointer', // 포인터 커서 스타일
    marginBottom: '20px'
};

function Signup() {

    // 초기값 세팅 - 아이디, 이름, 비밀번호, 이메일
    const [username, setUsername] = useState("");
    const [userid, setUserid] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("");
    
    const [errorMessage, setErrorMessage] = useState([]);
    const navigate = useNavigate();


    function onChange(event) {
        if(event.target.name === "username") {
            setUsername(event.target.value)
        } else if (event.target.name === "userid") {
            setUserid(event.target.value)
        } else if (event.target.name === "password") {
            setPassword(event.target.value)
        } else if (event.target.name === "passwordConfirm") {
            setPasswordConfirm(event.target.value)
        } else if (event.target.name === "email") {
            setEmail(event.target.value)
        }
    }


    async function onSubmit(event) {
        event.preventDefault();

        const newErrorMessages = [];
        if (username === "") {
            newErrorMessages.push("이름은 필수 입력 항목입니다.");
        }
        if (userid === "") {
            newErrorMessages.push("아이디는 필수 입력 항목입니다.");
        }
        if (password === "") {
            newErrorMessages.push("비밀번호는 필수 입력 항목입니다.");
        }
        if (passwordConfirm === "") {
            newErrorMessages.push("비밀번호 확인은 필수 입력 항목입니다.");
        }
        if (email === "") {
            newErrorMessages.push("이메일은 필수 입력 항목입니다.");
        }
        if (password !== passwordConfirm) {
            newErrorMessages.push("비밀번호가 일치하지 않습니다.");
        }


        setErrorMessage(newErrorMessages);

        if (newErrorMessages.length === 0) {
            try {
                const result = await axios.post("http://localhost:8080/signup", {
                    username: username,
                    userid: userid,
                    password: password,
                    passwordConfirm: passwordConfirm,
                    email: email
                })
                if (result.status === 200) {
                    navigate("/login")
                }
            } catch(error) {
                // console.log(error.response.data);
                if (error.response && error.response.data) {
                    // 서버에서 반환한 에러메세지 출력
                    // alert(error.response.data);
                    setErrorMessage([error.response.data]);
                    setUsername("")
                    setUserid("")
                    setPassword("")
                    setPasswordConfirm("")
                    setEmail("")
                } else {
                    console.log(error);
                }
            }
        }
    }

    return (
        <div className="container my-3">
            {/* <div className="my-3 border-bottom">
                <h3><b>회원가입</b></h3>
            </div> */}
            <br/>
            <div style={cardStyle}>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <form onSubmit={onSubmit} style={{width:'500px'}}>
                    {errorMessage.length > 0 &&
                        (<div className="alert alert-danger" role="alert">
                            {errorMessage.map((message, index) => (<div key={index}>{message}</div>))}
                        </div>)
                    }
                    <div style={{fontWeight: 'bold', color: '#454a50', fontSize: '20px', marginBottom:'10px'}}>Sign Up</div>
                    <div className="form-floating mb-3">
                        {/* <label htmlFor="username" className="form-label"><b>이름</b></label> */}
                        {/* <input onChange={onChange} value={username} type="text" className="form-control" id="username" name="username"></input> */}
                        <input onChange={onChange} value={username} type="text" className="form-control" id="username" name="username" placeholder="username"></input>
                        <label htmlFor="username" className="form-label" style={{fontSize: '15px', color: '#868e96'}}>이름</label>
                    </div>
                    <div className="form-floating mb-3">
                        {/* <input onChange={onChange} value={userid} type="text" className="form-control" id="userid" name="userid" autoComplete="username"></input> */}
                        <input onChange={onChange} value={userid} type="text" className="form-control" id="userid" name="userid" placeholder="userid"></input>
                        <label htmlFor="userid" className="form-label" style={{fontSize: '15px', color: '#868e96'}}>아이디</label>                    
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={onChange} value={password} type="password" className="form-control" id="password" name="password" placeholder="newpassword" autoComplete="new-password"></input>
                        <label htmlFor="password" className="form-label" style={{fontSize: '15px', color: '#868e96'}}>비밀번호</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={onChange} value={passwordConfirm} type="password" className="form-control" id="passwordConfirm" name="passwordConfirm" placeholder="passwordConfirm" autoComplete="new-password"></input>
                        <label htmlFor="passwordConfirm" className="form-label" style={{fontSize: '15px', color: '#868e96'}}>비밀번호 확인</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={onChange} value={email} type="email" className="form-control" id="email" name="email" placeholder="email"></input>
                        <label htmlFor="email" className="form-label" style={{fontSize: '15px', color: '#868e96'}}>이메일</label>
                    </div>
                    <br/>
                    <button type="sumbit" className="btn btn-primary" style={signupButtonStyle}><b>Submit</b></button>
                    <p style={signinStyle}>Already have an acount ? <Link to="/login" style={signinLinkStyle}>Login</Link> </p>
                </form>
            </div>
            </div>
        </div>
    )
}


export default Signup;