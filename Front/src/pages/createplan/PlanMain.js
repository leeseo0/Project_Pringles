import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from 'date-fns/esm/locale';

import "react-datepicker/dist/react-datepicker.css";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

function DateRangePicker() {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDatechange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const moveNextClick = () => {
    if (startDate && endDate) {
      navigate('/createplan/choiceaccommodation', {state: {startDate, endDate}});
    } else {
      alert('날짜를 선택해야 합니다.');
    }
  };

  return (
    <>

        <div className="card mx-auto" style={cardStyle}>
          <div className="text-center" style={headerStyle}>
            <br />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

              <h3 style={{ textAlign: 'center' }}><b>날짜를 선택하세요</b></h3>
              <button type="button" className="btn btn-outline-secondary" onClick={moveNextClick}>다음</button>
            </div>
          </div>

          
          <div className="body" style={bodyStyle}>
            <br />
            <div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ border: '1px solid lightGray', borderRadius: '5px', padding: '10px', margin: '10px', width: '225px', height: '50px' }}>
                  <p><b>시작일  |  </b>    <b>{startDate ? startDate.toLocaleDateString('ko-KR') : 'yyyy.mm.dd'}</b></p>
                </div>
                <div style={{ border: '1px solid lightGray', borderRadius: '5px', padding: '10px', margin: '10px', width: '225px', height: '50px' }}>
                  <p><b>종료일  |  </b> <b>{endDate ? endDate.toLocaleDateString('ko-KR') : 'yyyy.mm.dd'}</b></p>
                </div>
              </div>
            </div>
            <br />
            <div className="text-center"> {/* 중앙에 배치 */}
              <SDatePicker
                locale={ko}
                dateFormat="yyyy년 MM월 dd일"
                className="input-datepicker"
                placeholderText="날짜 선택"
                selected={startDate}
                onChange={handleDatechange}
                monthsShown={2}
                minDate={new Date()}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
              />
            </div>
          </div>
          <br />
          {/* <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <button type="button" className="btn btn-outline-secondary" onClick={moveNextClick}>다음</button>
          </div> */}
        </div>
        
      
    </>
  );
}

export default DateRangePicker;

const SDatePicker = styled(DatePicker)`
  margin-left: 0.5rem;
  width: 600px;
  height: 300px;
  box-sizing: border-box;
  padding: 8px 10px;
  border-radius: 5px;
  border: 1px solid lightGray;
  font-size: 13px;
  color: lightGray;
  display: block;
  margin: 0 auto;
`;

const cardStyle = {
  width: '600px',
  height: '500px',
  backgroundColor: '#fff',
  // boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  borderRadius: '10px',
  overflow: 'hidden',
  marginTop: '5%', // 카드 위쪽 마진
  
};

const headerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  // textShadow: ' 0 4px 5px 0 rgba(255,152,0,.14), 0 1px 10px 0 rgba(255,152,0,.12), 0 2px 4px -1px rgba(255,152,0,.2)', // 텍스트 그림자 추가
  // backgroundColor: '#ff9900c9',
  // bordercolor: '#ff9900c9',
  // boxShadow: ' 0 4px 5px 0 rgba(255,152,0,.14), 0 1px 10px 0 rgba(255,152,0,.12), 0 2px 4px -1px rgba(255,152,0,.2)',
  padding: '5px',
  textAlign: 'center',
  fontSize: '14px',
};

const bodyStyle = {
  padding: '10px',
};