import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

function ChoiceTrans() {
    const [selectedTrans, setSelectedTrans] = useState("");
    const [title, setTitle] = useState("");

    const [errorMessage, setErrorMessage] = useState([]);
    const navigate = useNavigate();

    // 선택한 날짜, 숙소, 관광지 정보
    const location = useLocation();
    const {selectedStartDate, selectedEndDate, selectedHostels, selectedSights, selectedRecommedYn, inputPriceWeight, inputRatingWeight, inputReviewWeight} = location.state;
    // const selectedStartDate = location.state.startDate;
    // const selectedEndDate = location.state.endDate;
    // const selectedHostels = location.state.selectedHostels;
    // const selectedSights = location.state.selectedSights;
    console.log('숙소:', selectedHostels)
    console.log('숙소이름:', selectedHostels.map((hostel) => hostel.name))
    console.log('관광지:', selectedSights)
    console.log('시작일:', selectedStartDate.toLocaleDateString())
    console.log('시작일:', moment(selectedStartDate).format("YYYY. MM. DD"))
    console.log('추천여부:', selectedRecommedYn)
    console.log('리뷰 가중치:', inputRatingWeight)

    // 교통수단 선택 후 호출될 함수
    const handleTransSelect = (trans) => {
        setSelectedTrans(trans);
    }

    // 일정 제목 입력
    const titleOnChange = (event) => {
        setTitle(event.target.value);
    }

    // onSubmit 기능
    async function onSubmit(event) {
        event.preventDefault();

        console.log(localStorage.getItem("userid"));

        try {
            const result = await axios.post(`http://localhost:8080/createplan/schedule/${localStorage.getItem("userid")}`, {
                title: title,
                // startdate: selectedStartDate,
                startdate: moment(selectedStartDate).format("YYYY-MM-DD"),
                enddate: selectedEndDate,
                accommodation: selectedHostels.map((hostel) => hostel.name),
                recommendyn: selectedRecommedYn,
                priceweight: inputPriceWeight,
                ratingweight: inputRatingWeight,
                reviewweight: inputReviewWeight,
                sights: selectedSights.map((sights) => sights.name),
                transportation: selectedTrans
            })
            if (result.status === 200) {
                console.log(result);
                navigate("/createplan/showselection")
            }
        } catch (error) {
            console.log(error);
            alert("서버 문제!")           
        }
    }

    // 페이지 이동
    const moveNextClick = () => {
        navigate('/createplan/showselection', {state: {selectedStartDate, selectedEndDate, selectedHostels, selectedSights, selectedTrans}})
    }

    const transButtonStyle = {
        // backgroundColor: "transparent",
        // border: "none",
        cursor: "pointer",
        padding: "30px",
        margin: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: '20px',
        fontWeight: 'bold'
    }

    const iconStyle = {
        width: "300px",
        height: "300px"
    }

    return (
        <div className="container my-3">
            <div>
                <h3><b>교통수단 선택</b></h3>
            </div>

            {/* 교통수단 선택 버튼 */}
            <div className="border-bottom" style={{display:'flex', justifyContent:'center'}}>
                <div>
                    <button onClick={() => handleTransSelect("대중교통")} className="btn btn-outline-secondary" style={transButtonStyle}>
                    <img src="https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-public-transport-line-icon-vector-png-image_6684263.png" alt="대중교통" style={iconStyle}/>
                    대중교통
                    </button>
                </div>
                <div>
                    <button onClick={() => handleTransSelect("자가용")} className="btn btn-outline-secondary" style={transButtonStyle}>
                    <img src="https://i.pinimg.com/474x/70/63/e1/7063e18a649262fe0882a311a0bbf20b.jpg" alt="자가용" style={iconStyle}/>
                    자가용
                    </button>
                </div>
            </div>
            <br/>

            {/* 일정 제목 입력 */}
            <div className="container my-3">
                <form>
                    <h4><b>일정 제목을 입력하세요</b></h4>
                    <label htmlFor="title" className="form-label"></label>
                    <input onChange={titleOnChange} type="text" className="form-control" value={title} id="title" name="title" style={{width:'80%'}}></input>
                </form>
            </div>
            
            {/* 다음 버튼 - 임시 */}
            <div style={{display:'flex', justifyContent:'flex-end'}}>
                <button type="button" className="btn btn-outline-secondary" onClick={moveNextClick}>다음</button>
            </div>

            {/* 저장 버튼 */}
            {/* 취소 - 현재 상태, 확인 - 선택된 정보들 DB에 저장 및 추천된 일정 구현 */}
            {/* 추천된 일정보고 다음or확인? 누르면 일정 목록 페이지로? -> 로그인 성공하면 메인 페이지로 이동하듯이 */}
            <div style={{display:'flex', justifyContent:'flex-end'}}>
            {/* Button trigger modal */}
            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">저장</button>
            
                {/* Modal */}
                <form onSubmit={onSubmit}>
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered modal-sm">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">저장하시겠습니까?</div>
                                <div class="modal-footer">

                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
                                <button type="submit" class="btn btn-primary">확인</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
      
    )
}

export default ChoiceTrans;