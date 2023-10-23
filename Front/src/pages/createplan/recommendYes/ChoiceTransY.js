import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

function ChoiceTrans() {
    const [selectedTrans, setSelectedTrans] = useState("");
    const [title, setTitle] = useState("");

    const navigate = useNavigate();

    // 선택한 날짜, 숙소, 관광지 정보
    const location = useLocation();
    const {selectedStartDate, selectedEndDate, selectedHostels, selectedSights, selectedRecommedYn, inputPriceWeight, inputRatingWeight, inputReviewWeight} = location.state;
    // const selectedStartDate = location.state.startDate;
    // const selectedEndDate = location.state.endDate;
    // const selectedHostels = location.state.selectedHostels;
    // const selectedSights = location.state.selectedSights;
    console.log('숙소이름:', selectedHostels.map((hostel) => hostel.name))
    console.log('관광지:', selectedSights)
    console.log('시작일:', selectedStartDate)
    console.log('종료일:', selectedEndDate)
    console.log('추천여부:', selectedRecommedYn)
    console.log('리뷰 가중치:', inputReviewWeight)
    console.log('가격 가중치:', inputPriceWeight)
    console.log('별점 가중치:', inputRatingWeight)
    
    // 날짜 차이 일수 계산
    let diff = Math.abs(selectedEndDate - selectedStartDate)
    diff = Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1
    console.log('days:', diff)

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
                startDate: selectedStartDate,
                // startdate: moment(selectedStartDate).format("YYYY-MM-DD"),
                endDate: selectedEndDate,
                days: diff,
                // accommodation: selectedHostels.map((hostel) => hostel.name),
                accommodation: JSON.stringify(selectedHostels.map((hostel) => hostel.name)),
                recommendYN: selectedRecommedYn,
                priceWeight: inputPriceWeight,
                ratingWeight: inputRatingWeight,
                reviewWeight: inputReviewWeight,
                // sights: selectedSights.map((sights) => sights.name),
                sights: JSON.stringify(selectedSights.map((sights) => sights[0][2])),
                transportation: selectedTrans                
            })
            if (result.status === 200) {
                console.log(result);
                navigate("/createplan/showselection", {state: {selectedStartDate, selectedEndDate, diff, selectedHostels, selectedRecommedYn : 'Y', inputReviewWeight, inputPriceWeight, inputRatingWeight, selectedSights, selectedTrans, title}})
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            alert("서버 문제!")           
        }
    }

    // // 페이지 이동
    // const moveNextClick = () => {
    //     navigate('/createplan/showselection', {state: {selectedStartDate, selectedEndDate, selectedHostels, selectedRecommedYn : 'Y', inputReviewWeight, inputPriceWeight, inputRatingWeight, selectedSights, selectedTrans, title}})
    // }

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
            <div className="row justify-content-center" >
                <div className="col-md-8">
                    {/* 위쪽 카드: 교통 수단 선택 */}
                    <div className="card" style={cardStyle}>
                        <div className="header" style={headerStyle}>
                            <br/>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/createplan')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 40" height="20" width="20" 
                                        class="button">
                                    <path d="M16 37L4 20 16 3" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"
                                    stroke-linejoin="round" opacity="0.8" />
                                    </svg>
                                </button>
                                <h3><b>어떤 교통 수단을 이용하시나요?</b></h3>
                                {/* <button type="button" className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">save</button> */}
                                <button  type="button" className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" 
                                style={{ ...buttonStyle, ...buttonHoverStyle }} > SAVE </button>
                                
                            </div>
                        </div>

                        <div className="body" style={{  ...bodyStyle}}>
                            <div style={{ display:'flex', justifyContent:'center', borderColor:'' }}>
                                <h4 style={{fontWeight:'bold'}}><b>  "{selectedTrans}"  </b></h4>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div>
                                    <button onClick={() => handleTransSelect("대중교통")} className="btn btn-outline-secondary" 
                                        style={{ ...transButtonStyle, boxShadow: '3px 3px 6px 0 rgba(0, 0, 0, 0.3)' , border: '1px solid lightGray', borderRadius: '5px' }}
                                    >
                                        <img src="https://cdn-icons-png.flaticon.com/512/2125/2125837.png" alt="대중교통" style={iconStyle} />
                                        대중교통
                                    </button>
                                </div>
                                <div>
                                    <button onClick={() => handleTransSelect("자가용")} className="btn btn-outline-secondary" 
                                        style={{ ...transButtonStyle, boxShadow: '3px 3px 6px 0 rgba(0, 0, 0, 0.3) ', border: '1px solid lightGray', borderRadius: '5px' }}
                                    >
                                        <img src="https://cdn-icons-png.flaticon.com/512/5507/5507167.png" alt="자가용" style={iconStyle} />
                                        자가용
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                {/* 일정 제목 입력 */}
                <div className="col-md-8">
                    <div className="card" style={underCardStyle}>
                        <div className="header" style={headerStyle}>
                            <h4><b>일정의 제목을 입력하세요</b></h4>
                        </div>
                        <div className="body" style={{  ...bodyStyle, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <form>
                                <label htmlFor="title" className="form-label"></label>
                                <input onChange={titleOnChange} type="text" className="form-control" value={title} id="title" name="title" style={{width:'800px'}}></input>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        
            {/* 다음 버튼 - 임시 */}
            {/* <div style={{display:'flex', justifyContent:'flex-end'}}>
                <button type="button" className="btn btn-outline-secondary" onClick={moveNextClick}>다음</button>
            </div> */}

            {/* 저장 버튼 */}
            {/* 취소 - 현재 상태, 확인 - 선택된 정보들 DB에 저장 및 추천된 일정 구현 */}
            {/* 추천된 일정보고 다음or확인? 누르면 일정 목록 페이지로? -> 로그인 성공하면 메인 페이지로 이동하듯이 */}
            <div style={{display:'flex', justifyContent:'flex-end'}}>
            {/* Button trigger modal */}
            {/* <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">저장</button> */}
        
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


const transButtonStyle = {
    cursor: "pointer",
    padding: "30px",
    margin: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: '20px',
    fontWeight: 'bold',
};

const iconStyle = {
    width: "300px",
    height: "300px",
};

const cardStyle = {
    // width: '100%',
    height: '85%%',
    backgroundColor: '#fff',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    borderRadius: '10px',
    overflow: 'hidden',
    // marginTop: '5%', // 카드 위쪽 마진
  };
  const underCardStyle = {
    // width: '100%',
    height: '85%%',
    backgroundColor: '#fff',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    borderRadius: '10px',
    overflow: 'hidden',
    marginTop: '2%', // 카드 위쪽 마진
  };

  const headerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '5px',
    textAlign: 'center',
    fontSize: '14px',
  };

  const bodyStyle = {
    padding: '20px',
  };

  const buttonStyle = {
    padding: '0.7em 1em',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '2.5px',
    fontWeight: 500,
    color: '#000',
    backgroundColor: '#fff',
    border: 'none',
    // borderRadius: '45px',
    boxShadow: '0 15px 20px rgba(255, 152, 0, 0.4)',
    transition: 'all 0.3s ease 0s',
    cursor: 'pointer',
    outline: 'none',
    marginRight: '2%'

  };
  
  const buttonHoverStyle = {
    backgroundColor: '#ff9800',
    boxShadow: '0 15px 20px 0 rgba(255, 152, 0, 0.4)',
    color: '#fff',
    transform: 'translateY(-7px)',
  };
  
  const buttonActiveStyle = {
    transform: 'translateY(-1px)',
  };