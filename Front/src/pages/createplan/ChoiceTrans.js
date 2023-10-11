import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ChoiceTrans() {
    const [selectedTrans, setSelectedTrans] = useState("");
    
    const navigate = useNavigate();
    // 선택한 날짜, 숙소, 관광지 정보
    const location = useLocation();
    const {selectedStartDate, selectedEndDate, selectedHostels, selectedSights, selectedRecommedYn} = location.state;
    // const selectedStartDate = location.state.startDate;
    // const selectedEndDate = location.state.endDate;
    // const selectedHostels = location.state.selectedHostels;
    // const selectedSights = location.state.selectedSights;
    console.log(selectedHostels)
    console.log(selectedSights)
    console.log(selectedStartDate)
    console.log(selectedRecommedYn)


    // 교통수단 선택 후 호출될 함수
    const handleTransSelect = (trans) => {
        setSelectedTrans(trans);
    }

    // 페이지 이동
    const moveNextClick = () => {
        navigate('/createplan/showselection', {state: {selectedStartDate, selectedEndDate, selectedHostels, selectedSights, selectedTrans}})
    }

    return (
        <>
            <div>
                <p>3. 교통수단 선택</p>
                <p>교통수단까지 선택하고 나면 장바구니처럼 선택한 리스트 화면에 표시하고 '저장'버튼 누르면 마이페이지 일정 목록에 저장될 수 있도록?</p>
            </div>

            {/* 교통수단 선택 버튼 */}
            <div>
                <button onClick={() => handleTransSelect("대중교통")}>대중교통</button>
                <button onClick={() => handleTransSelect("자가용")}>자가용</button>
            </div>
            
            {/* 다음 버튼 - 임시 */}
            <div style={{display:'flex', justifyContent:'flex-end'}}>
                <button type="button" className="btn btn-outline-secondary" onClick={moveNextClick}>다음</button>
            </div>

                {/* 저장 버튼 */}
                {/* 취소 - 현재 상태, 확인 - 선택된 정보들 DB에 저장 및 추천된 일정 구현 */}
                {/* 추천된 일정보고 다음or확인? 누르면 일정 목록 페이지로? -> 로그인 성공하면 메인 페이지로 이동하듯이 */}
                <div>
                {/* Button trigger modal */}
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">저장</button>
                {/* Modal */}
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        저장하시겠습니까?
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
                        <button type="button" class="btn btn-primary">확인</button>
                        {/* 확인 버튼 type="submit" 변경하고, onSubmit 함수(DB에 선택한 값들 들어가도록) 만들어서 입력 */}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
      
    )
}

export default ChoiceTrans;