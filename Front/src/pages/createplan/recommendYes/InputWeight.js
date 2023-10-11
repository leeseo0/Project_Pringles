import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function InputWeight() {
    const [inputPreferPrice, setInputPreferPrice] = useState("");
    const [inputPreferRating, setInputPreferRating] = useState("");
    const [inputPreferReview, setInputPreferReview] = useState("");

    const navigate = useNavigate();

    // 선택한 날짜, 숙소, 추천여부 정보 읽어오기
    const location = useLocation();
    const {selectedStartDate, selectedEndDate, selectedHostels, selectedRecommedYn} = location.state;
    // const selectedStartDate = location.state.startDate;
    // const selectedEndDate = location.state.endDate;
    // const selectedHostels = location.state.selectedHostels;
    console.log(selectedHostels);
    console.log(selectedRecommedYn);
    console.log(selectedStartDate);

    // 입력값 저장
    const inputChange = (event) => {
        if (event.target.name === "price") {
            setInputPreferPrice(event.target.value)
        } else if (event.target.name === "rating") {
            setInputPreferRating(event.target.value)
        } else if (event.target.name === "review") {
            setInputPreferReview(event.target.value)
        }
    }


    // function onChange(event) {
    //     if(event.target.name === "username") {
    //         setUsername(event.target.value)
    //     } else if (event.target.name === "userid") {
    //         setUserid(event.target.value)
    //     } else if (event.target.name === "password") {
    //         setPassword(event.target.value)
    //     } else if (event.target.name === "passwordConfirm") {
    //         setPasswordConfirm(event.target.value)
    //     } else if (event.target.name === "email") {
    //         setEmail(event.target.value)
    //     }
    // }

    const moveNextClick = () => {
        navigate('/createplan/y/choicesights', {state: {selectedStartDate, selectedEndDate, selectedHostels, selectedRecommedYn:'yes'}})
    }

    return (
        <div className="container my-3">
            <h3>사용자 선호도 입력</h3>
            <br/>
            <div className="mb-3">
                <label for="customRange1" className="form-label">가격</label>
                <input type="range" className="form-range" min="0" max="100" step="5" id="customRange1"></input>
            </div>
            <div className="mb-3">
                <label for="customRange2" className="form-label">별점</label>
                <input type="range" className="form-range" min="0" max="100" step="5" id="customRange2"></input>
            </div>
            <div className="mb-3">
                <label for="customRange3" className="form-label">리뷰</label>
                <input type="range" className="form-range" min="0" max="100" step="5" id="customRange3"></input>
            </div>
            <br/>
            <button type="button" onClick={moveNextClick}>다음</button>
        </div>
    )
}

export default InputWeight;