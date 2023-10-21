import React from "react";
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
    width: "1300px",
    height: "600px",
  };

  return (
    <Slider {...settings}>
      <div>
        <img src={img1} alt="Image 1" style={imageStyle} />
      </div>
      <div>
        <img src={img2} alt="Image 2" style={imageStyle} />
      </div>
      <div>
        <img src={img3} alt="Image 3" style={imageStyle} />
      </div>
      <div>
        <img src={img4} alt="Image 4" style={imageStyle} />
      </div>
      <div>
        <img src={img5} alt="Image 5" style={imageStyle} />
      </div>
      <div>
        <img src={img6} alt="Image 6" style={imageStyle} />
      </div>
    </Slider>
  );
};

export default ImageSlider;