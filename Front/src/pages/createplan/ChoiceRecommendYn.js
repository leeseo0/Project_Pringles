import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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

        <div   className='card mx-auto' style={cardStyle}
        //     style={{

        //         display: 'flex',
        //         flexDirection: 'column',
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //         width: '70vh',
        //         height: '50vh',
        //         borderRadius: '10px', // 테두리를 둥글게 만듭니다.
        //         border: '1px solid lightGray', // 테두리 스타일
        //         boxShadow: '0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2)', // 그림자 스타일
        //         padding: '20px', // 컨테이너 내부 간격
        //         position: 'absolute',
        //         top: '50%', 
        //         left: '50%', 
        //         transform: 'translate(-50%, -50%)',
        // }}
            >
                {/* display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:'50vh' */}
            <div className='text-center' style={headerStyle}>
            <br />
                <h2><b>일정을 추천받으시겠습니까?</b></h2>

            </div>
            

            <div className='text-center' style={bodyStyle}>
                <div>
                    <button onClick={() => Click('no')} className='btn btn-outline-secondary' style={{margin:'10px'}}>아니요, 괜찮아요!</button>
                    <button onClick={() => Click('yes')} className='btn btn-outline-secondary' style={{margin:'10px'}}>네, 받아볼래요!</button>                
                </div>
            </div>
 



                {/* <div>
                    <button
                        onClick={() => Click('no')}
                        className='btn btn-outline-secondary'
                        style={{
                            margin: '10px',
                            padding: '17px 40px',
                            borderRadius: '50px',
                            border: '0',
                            backgroundColor: '9c27b0',
                            boxShadow: '0 4px 5px 0 rgba(76,175,80,.14), 0 1px 10px 0 rgba(76,175,80,.12), 0 2px 4px -1px rgba(76,175,80,.2)',
                            letterSpacing: '1.5px',
                            textTransform: 'uppercase',
                            fontSize: '15px',
                            transition: 'all 0.5s ease',
                        }}
                    >
                        아니요, 괜찮아요!
                    </button>
                    <button
                        onClick={() => Click('yes')}
                        className='btn btn-outline-secondary'
                        style={{
                            margin: '10px',
                            padding: '17px 40px',
                            borderRadius: '50px',
                            border: '0',
                            backgroundColor: 'white',
                            boxShadow: '0 4px 5px 0 rgba(255,152,0,.14), 0 1px 10px 0 rgba(255,152,0,.12), 0 2px 4px -1px rgba(255,152,0,.2)',
                            letterSpacing: '1.5px',
                            textTransform: 'uppercase',
                            fontSize: '15px',
                            transition: 'all 0.5s ease',
                        }}
                    >
                        네, 받아볼래요!
                    </button>
                </div> */}
        </div>
    );
}

export default ChoiceRecommend;


const cardStyle = {
    width: '500px',
    height: '400px',
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
    width: '500px',
    height: '400px',
  }; 

