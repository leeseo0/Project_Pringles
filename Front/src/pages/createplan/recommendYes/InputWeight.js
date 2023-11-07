import  React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
// import Input from "../../../components/Input";
// import "../../../style/WeightInput.css";
import Slider, { SliderThumb, SliderValueLabelProps } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';


function InputWeight() {
    const [inputPriceWeight, setinputPriceWeight] = useState(0.1);
    const [inputRatingWeight, setinputRatingWeight] = useState(0.0);
    const [inputReviewWeight, setinputReviewWeight] = useState(0.0);
    const navigate = useNavigate();

    // 선택한 날짜, 숙소, 추천여부 정보 읽어오기
    const location = useLocation();
    const {selectedStartDate, selectedEndDate, selectedHostels, selectedRecommedYn} = location.state;
    // const selectedStartDate = location.state.startDate;
    // const selectedEndDate = location.state.endDate;
    // const selectedHostels = location.state.selectedHostels;
    console.log(selectedHostels);
    console.log(selectedRecommedYn);
    console.log(selectedStartDate);

    const inputChange = (event) => {
        if (event.target.name === "priceWeight") {
            setinputPriceWeight(event.target.value)
        } else if (event.target.name === "ratingWeight") {
            setinputRatingWeight(event.target.value)
        } else if (event.target.name === "reviewWeight") {
            setinputReviewWeight(event.target.value)
        }
    }
    
    const [value, setValue] = useState(20);

    const handleChange = (event) => {
        setValue(parseInt(event.target.value, 10));
    };

    console.log(inputPriceWeight,inputRatingWeight,inputReviewWeight)

    const moveNextClick = () => {
        navigate('/createplan/y/choicesights', {state: {selectedStartDate, selectedEndDate, selectedHostels, selectedRecommedYn:'Y', inputPriceWeight, inputRatingWeight, inputReviewWeight}})
    }


    const sendDataToFastAPI = async (weightdata) => {
        weightdata = {priceweight:parseFloat(inputPriceWeight),ratingweight:parseFloat(inputRatingWeight),reviewweight:parseFloat(inputReviewWeight)}
        console.log('senddata')
        console.log(weightdata)
        try {
          const response = await axios.post('http://localhost:8000/recommendations', weightdata);
            // return response.weightdata;
            console.log('sendapi')
            console.log(response.data);
            moveNextClick(); 
        } catch (error) {
          console.error('Error sending data to FastAPI', error);
        }
      };

    const handleRecommend = () => {
        // 데이터를 FastAPI로 보내는 POST 요청
        fetch('http://localhost:8000/api/recommend', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            priceWeight: inputPriceWeight,
            ratingWeight: inputRatingWeight,
            reviewWeight: inputReviewWeight,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
                navigate('/createplan/y/choicesights', {state: data={selectedStartDate, selectedEndDate, selectedHostels, selectedRecommedYn:'Y', inputPriceWeight, inputRatingWeight, inputReviewWeight}})
          })
          .catch((error) => {
            console.error('에러 발생: ', error);
          });
      }

    return (
        <div className="container" style={{display: 'flex', justifyContent: 'center',  alignItems: 'center'}}>
            <div className="card" style={cardStyle}>
                <div className='text-center' style={headerStyle}>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/createplan')}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 40" height="20" width="20" className="button">
                                <path d="M16 37L4 20 16 3" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"
                                    stroke-linejoin="round" opacity="0.8" />
                            </svg>
                        </button>
                        <h3><b>선호도 선택해주세요</b></h3>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => { moveNextClick(); sendDataToFastAPI(); }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 40" height="20" width="20" className="button">
                                <path d="M4 37l12-17L4 3" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"
                                    stroke-linejoin="round" opacity="0.8" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="body" style={ {...bodyStyle, display: 'flex', justifyContent: 'center'}}>
                    <div className="row">
                        <div className="col-md-6" >
                            <div className="chat-card" style={chatCardStyles}>
                                <div className="card-header" style={cardHeaderStyles}>
                                    <div className="img-avatar" style={imgAvatarStyles}></div>
                                    <div className="text-chat" style={textChatStyles}>Chat</div>
                                </div>
                                <div className="card-body">
                                    <div className="messages-container">
                                        <div className="message-box left" style={leftMessageBoxStyles}>
                                            <p> 우리 제주도 어디가지? </p>                           
                                        </div>
                                        <div className="message-box left" style={leftMessageBoxStyles}>
                                            <h4> 가격, 리뷰, 평점 </h4>      
                                        </div>
                                        <div className="message-box left" style={leftMessageBoxStyles}>
                                            <p> 셋 중 뭐가 젤 중요함?</p>
                                        </div>

                                    </div>
                                    <div className="message-input" style={{ ...messageInputStyles }}>
                                        <div className="message-send" style={{ display: 'flex', border: '1px solid gray', padding: '10px', borderRadius: '10px'}}>
                                            <p style={{ flex: 1, margin: 0 }}>세 가지에 대한 중요도를 입력해주세요</p>
                                            <button type="submit" className="button-send" style={buttonSendStyles}>Send</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="chat-card" style={chatCardStyles}>
                                <div className="card-header" style={cardHeaderStyles}>
                                    <div className="img-avatar" style={imgAvatarStyles}></div>
                                    <div className="text-chat" style={textChatStyles}>Chat</div>
                                </div>
                                <div className="card-body" >
                                    <div className="messages-container">
                
                                        <div className="message-box right" style={rightMessageBoxStyles}>
                                        <div className="d-flex flex-column" style={{ marginTop: '20px' }}>
                                        <div className="me-3" style={{ width: '100%' }}>
                                            <Typography gutterBottom>💰 가격 💰</Typography>
                                            <PrettoSlider
                                                valueLabelDisplay="auto"
                                                aria-label="priceWeight"
                                                value={inputPriceWeight}
                                                onChange={inputChange}
                                                min={0}
                                                max={1}
                                                step={0.1}
                                                id="priceWeight"
                                                name="priceWeight"
                                            />
                                        </div>
                                        <div className="me-3" style={{ width: '100%' }} >
                                            <Typography gutterBottom>⭐ 별점 ⭐</Typography>
                                            <PrettoSlider
                                                valueLabelDisplay="auto"
                                                aria-label="ratingWeight"
                                                value={inputRatingWeight}
                                                onChange={inputChange}
                                                min={0}
                                                max={1}
                                                step={0.1}
                                                id="ratingWeight"
                                                name="ratingWeight"
                                            />
                                        </div >
                                        <div className="me-3" style={{ width: '100%' }}>
                                            <Typography gutterBottom>✏️ 리뷰 ✏️</Typography>
                                            <PrettoSlider
                                                valueLabelDisplay="auto"
                                                aria-label="reviewWeight"
                                                value={inputReviewWeight}
                                                onChange={inputChange}
                                                min={0}
                                                max={1}
                                                step={0.1}
                                                id="reviewWeight"
                                                name="reviewWeight"
                                            />
                                        </div>
                                    </div>
                                </div>
                                    </div>
                                    
                                    <div className="message-input" style={{ ...messageInputStyles }}>
                                        <div className="message-send" style={{ display: 'flex', border: '1px solid gray', padding: '10px', borderRadius: '10px',  margin: '0' }}>
                                            <p style={{ flex: 1, margin: 0 }}> 가격은 {inputPriceWeight}<br />별점은 {inputRatingWeight}<br />리뷰는 {inputReviewWeight} 이야</p>
                                            <button type="submit" className="button-send" style={buttonSendStyles } onClick={() => { moveNextClick(); sendDataToFastAPI(); }}>Send</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        
                    </div>
                </div>
        </div>
    </div>
    );
}

export default InputWeight;

const cardStyle = {
    width: '1000px',
    height: '600px',
    backgroundColor: '#fff',
    // boxShadow: '0 4px 5px rgba(0, 0, 0, 0.14)',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    borderRadius: '10px',
    overflow: 'hidden',

  };
  
const headerStyle = {
backgroundColor: '#333',
color: '#fff',
padding: '5px',
textAlign: 'center',
fontSize: '14px',
};

const bodyStyle = {
padding: '10px',
}; 



  

const PrettoSlider = styled(Slider)({
    color: '#F78535',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#F78535',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });


  const chatCardStyles = {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '15px',
    margin: '20px',
    display: 'flex',
    flexDirection: 'column',
    width: '350px',
    border: '1px solid lightgray'
  };

  
  const cardHeaderStyles = {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '10px',
    borderBottom: '1px solid #ccc',
  };
  
  const imgAvatarStyles = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '20px',
    backgroundColor: '#333',
  };
  
  const textChatStyles = {
    color: 'black',
    margin: 0,
    fontSize: '18px',
  };
  
  const messageBoxStyles = {
    padding: '10px',
    marginBottom: '5px',
    borderRadius: '10px',
    fontSize: '13px',
  };
  
  const leftMessageBoxStyles = {
    ...messageBoxStyles,
    backgroundColor: '#f1f1f1',
    color: 'black',
    width: '75%', // 너비 조절
    padding: '15px', // 내부 여백 조절
    fontSize: '14px', // 폰트 크기 조절
  
  };
  
  const rightMessageBoxStyles = {
    ...messageBoxStyles,
    backgroundColor: '#333',
    color: '#fff',
    padding: '15px'
  };
  
  const messageInputStyles = {
    padding: '5px',
    borderTop: '1px solid #ccc',
  };
  
  const messageSendStyles = {
    width: '100%',
    padding: '10px',
    border: 'none',
    borderRadius: '10px',
    resize: 'none',
    margin: '0'
    
  };
  
  const buttonSendStyles = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    marginLeft: '10px',
    borderRadius: '10px',
    fontSize: '13px',
    
  };
  