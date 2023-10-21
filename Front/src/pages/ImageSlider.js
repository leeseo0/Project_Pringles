import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.jpg";
import img4 from "../images/img4.jpg";
import img5 from "../images/img5.jpg";
import img6 from "../images/img6.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  const settings = {
    dots: true, // 페이지 번호 표시
    infinite: true, // 무한 루프
    speed: 500, // 슬라이딩 속도 (밀리초)
    slidesToShow: 1, // 한 번에 보여질 슬라이드 수
    slidesToScroll: 1, // 스크롤할 슬라이드 수
    autoplay: true, // 자동 슬라이딩 활성화
    autoplaySpeed: 3000,
  };
  
  const imageStyle = {
    width: "1000px",
    height: "500px",
    display: "block", // 이미지를 블록 요소로 설정
    margin: "0 auto",
    marginTop: "20px",
  };

  const buttonStyle = {
    position: "relative",
    display: "inline-block",
    cursor: "pointer",
    outline: "none",
    border: 0,
    verticalAlign: "middle",
    textDecoration: "none",
    background: "transparent",
    padding: 0,
    fontSize: "inherit",
    fontFamily: "inherit",
    width: "12rem",
    height: "auto",
  };
  
  const circleStyle = {
    transition: "all 0.45s cubic-bezier(0.65, 0, 0.076, 1)",
    position: "relative",
    display: "block",
    margin: 0,
    width: "3rem",
    height: "3rem",
    background: "#ff9800",
    borderRadius: "1.625rem",
  };

  const buttonTextStyle = {
    transition: "all 0.45s cubic-bezier(0.65, 0, 0.076, 1)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: "0.75rem 0",
    margin: "0 0 0 1.85rem",
    color: "#ff9800",
    fontWeight: 700,
    lineHeight: 1.6,
    textAlign: "center",
    textTransform: "uppercase",
  };
  
  const hoverCircleStyle = {
    width: "100%",
  };
  
  const hoverButtonTextStyle = {
    color: "#fff",
  };

  const images = [img1, img2, img3, img4, img5, img6];
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);

  return (
    <div>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <div style={{ position: "relative" }}>
              <img src={image} alt={`Image ${index + 1}`} style={imageStyle} />
            </div>
          </div>
        ))}
      </Slider>
      <div style={{marginBottom:"50px"}}></div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="learn-more"
          style={{ ...buttonStyle, ...(isHovered1 && hoverCircleStyle) }}
          onMouseEnter={() => setIsHovered1(true)}
          onMouseLeave={() => setIsHovered1(false)}
        >
          <span className="circle" style={{ ...circleStyle, ...(isHovered1 && hoverCircleStyle) }}></span>
          <span className="button-text">
            <Link to="/sights" style={{ textDecoration: "none", ...buttonTextStyle, ...(isHovered1 && hoverButtonTextStyle) }}>Sights</Link>
          </span>
        </button>

        <button
          className="learn-more"
          style={{ ...buttonStyle, ...(isHovered2 && hoverCircleStyle) }}
          onMouseEnter={() => setIsHovered2(true)}
          onMouseLeave={() => setIsHovered2(false)}
        >
          <span className="circle" style={{ ...circleStyle, ...(isHovered2 && hoverCircleStyle) }}></span>
          <span className="button-text">
            <Link to="/createplan" style={{ textDecoration: "none", ...buttonTextStyle, ...(isHovered2 && hoverButtonTextStyle) }}>일정만들기</Link>
          </span>
        </button>

        <button
          className="learn-more"
          style={{ ...buttonStyle, ...(isHovered3 && hoverCircleStyle) }}
          onMouseEnter={() => setIsHovered3(true)}
          onMouseLeave={() => setIsHovered3(false)}
        >
          <span className="circle" style={{ ...circleStyle, ...(isHovered3 && hoverCircleStyle) }}></span>
          <span className="button-text">
            <Link to="/login" style={{ textDecoration: "none", ...buttonTextStyle, ...(isHovered3 && hoverButtonTextStyle) }}>Login</Link>
          </span>
        </button>
      </div>
  </div>
  );
};

export default ImageSlider;