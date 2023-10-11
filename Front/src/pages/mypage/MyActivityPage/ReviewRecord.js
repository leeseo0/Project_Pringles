import React, {useState} from "react";
import styled from "styled-components";
import { FaStar, FaStarHalf } from "react-icons/fa";   // 별 아이콘
// import { FaHeart } from "react-icons/fa";  // 하트 아이콘

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

const Image = styled.img`
  width: 100%;
  max-height: 190px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const StarIcon = styled(FaStar)`
  color: orange;
`;

const HalfStarIcon = styled(FaStarHalf)`
  color: orange;
`;

const ReviewRecord = ({ name, imageUrl, rating, reviewtext, onCheckboxChange }) => {

   // rating 값에 따라 별 아이콘 채우기
   const renderRatingStars = () => {
    const filledStars = Math.floor(rating); // rating 값의 정수 부분을 채워진 별로 표시
    const halfStar = rating - filledStars; // 소수 부분을 반 별로 표시
  
    const stars = [];
  
    for (let i = 0; i < filledStars; i++) {
      stars.push(<StarIcon key={i} />);
    }
  
    if (halfStar >= 0.5) {
      stars.push(<HalfStarIcon key="half" />);
    }
  
    return stars;
  };

  // 리뷰 텍스트를 최대 길이로 제한
  const maxLength = 30;
  const truncatedReviewText =
    reviewtext.length > maxLength
      ? reviewtext.slice(0, maxLength) + "..."
      : reviewtext;
  
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
      <Rating>
        {renderRatingStars()} {/* rating 값에 따라 별 아이콘을 렌더링 */}
        <span>{rating}</span>
      </Rating>
        {truncatedReviewText}{" "}
    </Container>
  );
};

export default ReviewRecord;