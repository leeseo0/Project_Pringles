import React, {useState} from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 260px;
  text-decoration: none;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  background-color: #fff;
`;

const Name = styled.h3`
  font-size: 18px; 
  font-weight: 700; 
  margin: 0; 
`;

const Day = styled.h5`
  font-size: 15px; 
  font-weight: 400; 
  margin: 0;
  color: #9370DB; 
`;

const Image = styled.img`
  width: 100%;
  max-height: 190px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const TravelRecord = ({ name, imageUrl, travelday, recordtext, onCheckboxChange }) => {
  // 리뷰 텍스트를 최대 길이로 제한
  const maxLength = 30;
  const truncatedRecordText =
    recordtext.length > maxLength
      ? recordtext.slice(0, maxLength) + "..."
      : recordtext;
  
  return (
    <Container>
        {/* 체크박스를 렌더링하고 체크 상태 변경 이벤트를 처리하는 콜백 함수를 전달 */}
      <input type="checkbox" onChange={onCheckboxChange} />
      <Image src={imageUrl} alt={name} />
      <h3>
        <Name>
        {name}{" "}
        </Name>
      </h3>
        <Day>{travelday}{" "}</Day>
        <p></p>      
        <p>{truncatedRecordText}{" "}</p>
    </Container>
  );
};

export default TravelRecord;