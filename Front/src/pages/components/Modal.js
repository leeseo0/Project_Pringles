import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ModalContainer from "./ModalContainer";
import useOutSideClick from "./useOutSideClick";



function Modal({ onClose, sightInfo }) {

  // const [sightInfo, setSightInfo] = useState(sightInfo);
  const modalRef = useRef(null);

  //닫기기능
  const handleClose = () => {
    onClose?.();
  };
  // 주변누르면 닫아지는거 
  useOutSideClick(modalRef, handleClose);
  useEffect(() => {
    // console.log("sightInfo", sightInfo)

    // 외부 스크롤 막기
    const $body = document.querySelector("body");
    const overflow = $body.style.overflow;
    $body.style.overflow = "hidden";
    return () => ($body.style.overflow = "auto");
  }, []);

  return (
    <ModalContainer>
      <Overlay>
        <ModalWrap ref={modalRef}>
          <Button onClick={handleClose}>&times;</Button>

          <Contents>
            <h1 > {sightInfo.name} </h1>
            <h6> {sightInfo.type}</h6>
            <ContentsImg src={sightInfo.firstimage} alt={sightInfo.name} />
            <br/>
            <div className="content">
              <h6> ⭐ {sightInfo.rating} / ✏️ {sightInfo.review} </h6> 
              {/* <h6> {sightInfo.type}</h6> */}
    
              <h6> 📍 {sightInfo.address1} </h6>
              <br/>
              <h6> 📞 {sightInfo.tel}</h6>
              <br/>
              <h6> ⏰ {sightInfo.placetime}</h6> 
            </div>
          </Contents>

        </ModalWrap>
      </Overlay>
    </ModalContainer>

  // <ModalContainer>
  //   <div className="overlay">
  //     <div className="modal-wrap" ref={modalRef}>
  //       <div className="close-button" onClick={handleClose}>&times;</div>

  //       <div className="contents">
  //         <h1> {sightInfo.name} </h1>
  //         <img src={sightInfo.firstimage} alt={sightInfo.name} />
  //         <br />
  //         <div className="content">
  //           <h6>{sightInfo.rating} / {sightInfo.review} </h6>
  //           <h6>{sightInfo.type}</h6>

  //           <h6> {sightInfo.address1} </h6>
  //           <br />
  //           <h6>{sightInfo.tel}</h6>
  //           <br />
  //           <h6>{sightInfo.placetime}</h6>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </ModalContainer>

  );
}


const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 5px;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const ModalWrap = styled.div`
  width: 600px;
  height: fit-content;
  border-radius: 15px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(192,192,192);
  padding: 20px; 
  box-shadow: 3px 3px 5px rgba(192,192,192, 0.1);
`;

// const CloseButton = styled.div`
//   float: right;
//   width: 40px;
//   height: 40px;
//   margin: 20px;
//   cursor: pointer;
//   i {
//     color: #5d5d5d;
//     font-size: 30px;
//   }
// `;

const Button = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    background: none;
    border: none;
    font-size: 24px;
    line-height: 1;
    color: #000;
`;

const Contents = styled.div`
  margin: 50px 30px;
  h1 {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 60px;
  }
  img {
    margin-top: 60px;
    width: 300px;
  }
`;
// const Button = styled.button`
//   font-size: 14px;
//   padding: 10px 20px;
//   border: none;
//   background-color: #ababab;
//   border-radius: 10px;
//   color: white;
//   font-style: italic;
//   font-weight: 200;
//   cursor: pointer;
//   &:hover {
//     background-color: #898989;
//   }
  
// `;

const Title = styled.h1`
  text-align: center;
`;

const ContentsImg = styled.img`
  margin: 0 auto;
  display: block;
  width: 100%; 
  max-width: 100%; 
  height: 300px;
  object-fit: cover; 
`;




export default Modal;