import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function InputWeight() {
    const [inputPriceWeight, setinputPriceWeight] = useState(0.1);
    const [inputRatingWeight, setinputRatingWeight] = useState(0.0);
    const [inputReviewWeight, setinputReviewWeight] = useState(0.0);

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

    
    const inputChange = (event) => {
        if (event.target.name === "priceWeight") {
            setinputPriceWeight(event.target.value)
        } else if (event.target.name === "ratingWeight") {
            setinputRatingWeight(event.target.value)
        } else if (event.target.name === "reviewWeight") {
            setinputReviewWeight(event.target.value)
        }
    }

    console.log(inputPriceWeight)

    const moveNextClick = () => {
        navigate('/createplan/y/choicesights', {state: {selectedStartDate, selectedEndDate, selectedHostels, selectedRecommedYn:'Y', inputPriceWeight, inputRatingWeight, inputReviewWeight}})
    }

    return (
        <div className="container my-3">
            <h3><b>사용자 선호도 입력</b></h3>
            <br/>
            <p>가격 가중치가 높을수록 추천된는 금액 높음</p>
            <div className="mb-3">
                <label htmlFor="priceWeight" className="form-label"><b>"가격"</b></label>
                <input onChange={inputChange} value={inputPriceWeight} type="range" className="form-range" min="0" max="1" step="0.1" id="priceWeight" name="priceWeight"></input>
                <div><span>선택 값 : </span>{inputPriceWeight}</div>    
            </div>
            <br/>
            <div className="mb-3">
                <label htmlFor="ratingWeight" className="form-label"><b>"별점"</b></label>
                <input onChange={inputChange} value={inputRatingWeight} type="range" className="form-range" min="0" max="1" step="0.1" id="ratingWeight" name="ratingWeight"></input>
                <div><span>선택 값 : </span>{inputRatingWeight}</div>
            </div>
            <br/>
            <div className="mb-3">
                <label htmlFor="reviewWeight" className="form-label"><b>"리뷰"</b></label>
                <input onChange={inputChange} value={inputReviewWeight} type="range" className="form-range" min="0" max="1" step="0.1" id="reviewWeight" name="reviewWeight"></input>
            </div>
            <div><span>선택 값 : </span>{inputReviewWeight}</div>
            <br/>
            <br/>
            <button type="button" className="btn btn-success" onClick={moveNextClick}><b>다음</b></button>
        </div>
    )
}

export default InputWeight;