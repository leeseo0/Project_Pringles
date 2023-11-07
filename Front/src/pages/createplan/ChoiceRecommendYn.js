import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Yes from "../../images/Yes.png";
import No from "../../images/No.png";

function ChoiceRecommend() {
    const [selectedRecommedYn, setSelectedRecommedYn] = useState("");
    const navigate = useNavigate();

    // 선택한 날짜, 숙소 정보 읽어오기
    const location = useLocation();
    const {selectedStartDate, selectedEndDate, selectedHostels} = location.state;
    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);
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

        <div className='card mx-auto' style={cardStyle}>
                {/* display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:'50vh' */}
            <div className='text-center' style={headerStyle}>
            <br />
                <h3><b>일정을 추천받으시겠습니까?</b></h3>

            </div>

            <div className="body" style={{ ...bodyStyle, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button onClick={() => Click('no')} className="btn btn-outline-secondary"
                  style={{ ...transButtonStyle, boxShadow: '3px 3px 6px 0 rgba(0, 0, 0, 0.3)', border: '1px solid lightGray', borderRadius: '5px' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <img src={No} alt="아니요, 괜찮아요!" style={iconStyle} />
                    <br/>
                    아니요, 괜찮아요!
                  </div>
                </button>
                <button onClick={() => Click('yes')} className="btn btn-outline-secondary"
                  style={{ ...transButtonStyle, boxShadow: '3px 3px 6px 0 rgba(0, 0, 0, 0.3)', border: '1px solid lightGray', borderRadius: '5px' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <img src={Yes} alt="네, 받아볼래요!" style={iconStyle} />
                    <br/>
                    네, 받아볼래요!
                  </div>
                </button>
              </div>
            </div>
            
      </div>
    );
}

export default ChoiceRecommend;


const cardStyle = {
    width: '800px',
    height: '70vh',
    backgroundColor: '#fff',
    // boxShadow: '0 4px 5px rgba(0, 0, 0, 0.14)',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    borderRadius: '10px',
    overflow: 'hidden',
    marginTop: '5%', // 카드 위쪽 마진
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

const buttonStyle = {
    padding: '0.7em 1em',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '2.5px',
    fontWeight: 500,
    color: '#000',
    backgroundColor: '#fff',
    border: 'none',
    // borderRadius: '45px',
    boxShadow: '0 15px 20px rgba(255, 152, 0, 0.4)',
    transition: 'all 0.3s ease 0s',
    cursor: 'pointer',
    outline: 'none',
    marginRight: '2%'

  };
  
  const buttonHoverStyle = {
    backgroundColor: '#ff9800',
    boxShadow: '0 15px 20px 0 rgba(255, 152, 0, 0.4)',
    color: '#fff',
    transform: 'translateY(-7px)',
  };
  
  const buttonActiveStyle = {
    transform: 'translateY(-1px)',
  };

  const transButtonStyle = {
    cursor: "pointer",
    padding: "25px",
    margin: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '5%', // 카드 위쪽 마진
};

const iconStyle = {
    
  width: "250px",
  height: "250px",
};