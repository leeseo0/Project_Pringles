import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from 'date-fns/esm/locale';

import "react-datepicker/dist/react-datepicker.css";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function DateRangePicker() {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  // getDayOfWeek 함수 정의
  const getDayOfWeek = (date) => {
    const daysOfWeek = ["일","월","화","수","목","금","토"];
    return daysOfWeek[date.getDay()];
  }

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

  const SDatePicker = styled(DatePicker)`
    margin-left: 0.5rem;
    width: 300px;
    height: 400px;
    box-sizing: border-box;
    padding: 8px 10px;
    border-radius: 5px;
    border: 1px solid lightGray;
    font-size: 13px;
    font-color: lightGray;
    `;
  
  return (
    <>
      <div className="text-center">
          <h3><b>날짜를 선택하세요</b></h3>
          <br/>
          <br/>
          <SDatePicker
              locale={ ko }
              dateFormat="yyyy년 MM월 dd일"
              selected={startDate}
              onChange={handleDatechange}
              monthsShown={2}
              minDate={new Date()}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
          />
          {startDate && endDate && (
            <div>
              <br/>
              <p><b>시작일</b> : {startDate.toLocaleDateString()} ({getDayOfWeek(startDate)})</p>
              <p><b>종료일</b> : {endDate.toLocaleDateString()} ({getDayOfWeek(endDate)})</p>
            </div>
          )}
      </div>

      <br/>
      <div style={{display:'flex', justifyContent:'center'}}>
        <button type="button" className="btn btn-outline-secondary" onClick={moveNextClick}>다음</button>
      </div>
    </>
  );
};

export default DateRangePicker;