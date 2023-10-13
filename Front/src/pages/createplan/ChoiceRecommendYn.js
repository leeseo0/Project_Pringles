import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ChoiceRecommend() {
    const [selectedRecommedYn, setSelectedRecommedYn] = useState("");
    const navigate = useNavigate();

    // 선택한 날짜, 숙소 정보 읽어오기
    const location = useLocation();
    const {selectedStartDate, selectedEndDate, selectedHostels} = location.state;
    // const selectedStartDate = location.state.startDate;
    // const selectedEndDate = location.state.endDate;
    // const selectedHostels = location.state.selectedHostels;
    console.log('숙소:', selectedHostels)
    console.log('종료일:', selectedEndDate)

    // 답변 여부에 따라 다른 주소 이동 및 선택한 날짜, 숙소, 추천여부 값 전달    
    async function Click(answer) {
        if (answer === 'no') {
            setSelectedRecommedYn("N");
            navigate('/createplan/n/choicesights', {state: {selectedStartDate, selectedEndDate, selectedHostels, selectedRecommedYn:'N'}});
        } else if (answer === 'yes') {
            setSelectedRecommedYn("Y");
            navigate('/createplan/y/inputweights', {state: {selectedStartDate, selectedEndDate, selectedHostels, selectedRecommedYn:'Y'}});
        }
    }

    // console.log(setSelectedRecommedYn)

    return(
        <div className='container my-3'>
            <div className='container text-center' style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:'50vh'}}>
                <div>
                    <h2><b>일정을 추천받으시겠습니까?</b></h2>
                </div>
                <br/>
                <br/>
                <div>
                    <button onClick={() => Click('no')} className='btn btn-outline-secondary' style={{margin:'10px'}}>아니요, 괜찮아요!</button>
                    <button onClick={() => Click('yes')} className='btn btn-outline-secondary' style={{margin:'10px'}}>네, 받아볼래요!</button>
                </div>
            </div>
        </div>
    );
}

export default ChoiceRecommend;