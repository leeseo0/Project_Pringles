import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UserinfoModify() {
    const [userInfo, setUserInfo] = useState([]);
    const [pwd, setPwd] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    console.log(window.localStorage.getItem("userid"))
    
    useEffect(() => {
        async function getUserInfo() {
            try {
                const result = await axios.put(`http://localhost:8080/mypage/modify/${window.localStorage.getItem("userid")}`);
                console.log(result);
                setUserInfo(result.data);
            } catch (error) {
                console.log(error);
            }
        }
        getUserInfo();
    }, [])

    return (
        <div>회원정보 수정 페이지</div>
    )
}

export default UserinfoModify;