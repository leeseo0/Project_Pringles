import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from './Sidebar';
import { IconButton } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

function PlanList() {
    const [scheduleList, setSchduleList] = useState([]);
    const [sharedStatus, setSharedStatus] = useState({});   // 공유 상태 저장

    const navigate = useNavigate();
    
    // 일정 목록 불러오기
    useEffect(() => {
        async function getPlanList() {
            try {
                const result = await axios.get(`http://localhost:8080/mypage/planlist/${window.localStorage.getItem("userid")}`);
                console.log(result);
                setSchduleList(result.data);

                // 일정id별로 공유 상태 반환 (shared 1이면 true, 아니면 false)
                const initialSharedStatus = {};
                result.data.forEach((schedule) => {
                    initialSharedStatus[schedule.schedule_id] = schedule.shared === 1;
                });
                setSharedStatus(initialSharedStatus);  // 공유상태 정보 초기화

                // // 기존에 저장된 공유 상태 초기화
                // const initialSharedStatus = {};
                // result.data.forEach((schedule) => {
                //     initialSharedStatus[schedule.schedule_id] = false;   // 모두 미공유 상태
                // });
                // setSharedStatus(initialSharedStatus);
            } catch (error) {
                console.log(error);
            }
        }
        getPlanList();
    }, [])


        // // 공유 상태 토글
        // setSharedStatus((prevStatus) => ({
        //     ...prevStatus,
        //     [scheduleId]: !prevStatus[scheduleId]
        // }));

    
    // 공유 버튼 상태를 토글 및 공유 상태 전송 및 업데이트
    const toggleShareStatus = async (scheduleId) => {
        // setSharedStatus(!sharedStatus);

        // 현재 공유 상태
        const currentSharedStatus = sharedStatus[scheduleId];

        if (currentSharedStatus) {
            // 이미 공유 상태일 때, 바로 미공유 상태로 변경
            setSharedStatus((prevStatus) => ({
                ...prevStatus,
                [scheduleId]: !prevStatus[scheduleId]
            }));
        } else {
            // 미공유 상태일 때, 사용자에게 확인 메시지 표시
            if (window.confirm("게시물을 공유하시겠습니까?")) {
                setSharedStatus((prevStatus) => ({
                    ...prevStatus,
                    [scheduleId]: !prevStatus[scheduleId]
                }));
            }
        }

        try {
            // 공유 상태 업데이트 요청
            const response = await axios.put(`http://localhost:8080/mypage/planlist/update-share-status/${scheduleId}`, {
                shared: currentSharedStatus ? 0 : 1,   // true일 경우 0, false일 경우 1
            });
            if (response.status === 200) {
                console.log(response)
            }
        } catch (error) {
            console.log(error);
        }
    };

    console.log(sharedStatus)
    

    // 삭제 버튼 클릭 함수
    const deleteClick = async (scheduleId) => {
        if (window.confirm("삭제하시겠습니까?")) {
            console.log(scheduleId);
            try {
                await axios.delete(`http://localhost:8080/mypage/planlist/plan-delete/${scheduleId}`);
                alert("삭제 되었습니다.");
                window.location.reload();
                navigate("/mypage/planlist");
            } catch (error) {
                alert("네트워크 문제로 삭제가 되지 않았습니다.");
            }
        }
    }
    

    return(
        <div>
            <h3 style={{fontSize:'30px'}}><b>마이페이지</b></h3>
            <br/>
            <div style={{display:'flex'}}>
                <Sidebar />
                <div className='row' style={{marginLeft:'10px'}}>
                <h5 style={{fontSize:'20px', fontWeight:'bold'}}>나의 일정 목록🏷️</h5>
                    {scheduleList.map((schedule, index) => {
                        return (
                            <div className='col-md-4'>
                                <div className='card' style={{width:"18rem", position:'relative'}}>
                                    <img
                                    src="https://img.myloview.com/stickers/set-of-pictures-flat-color-ui-icon-digital-photo-library-multimedia-management-visual-design-simple-filled-element-for-mobile-app-colorful-solid-pictogram-vector-isolated-rgb-illustration-700-317129657.jpg"
                                    className="card-img-top"
                                    alt="Your image"
                                     onClick={() => navigate(`/mypage/planlist/plan/${schedule.schedule_id}`)}/>
                                    <div className='card-body'>
                                        <p><b> 일정명: {schedule.title}</b></p>
                                        <div className='card-text'>                                        
                                            <p> {schedule.startDate} - {schedule.endDate}</p>
                                        </div>
                                        <button 
                                            onClick={() => deleteClick(schedule.schedule_id)}
                                            className="btn btn-outline-secondary btn-sm"
                                            style={{position:'absolute', top:'2.5px', right:'45px', border:'none'}}>
                                            <IconButton sx={{p:"1px"}}><DeleteOutlinedIcon/></IconButton>
                                            {/* <b>삭제</b> */}
                                        </button>
                                        <div className='form-check form-switch' style={{position:'absolute', top:'5px', right:'0px'}}>
                                            <input className='form-check-input' type='checkbox' role='switch'
                                                id={`shared_${schedule.schedule_id}`}
                                                checked={sharedStatus[schedule.schedule_id]}
                                                onChange={() => toggleShareStatus(schedule.schedule_id)}></input>
                                            <label className='form-check-label' htmlFor='shared'>
                                                {/* <div className='switch'>
                                                    <div className={`slider ${sharedStatus[schedule.schedule_id] ? 'checked' : ''}`}></div>
                                                </div> */}
                                                
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                
            </div>
        </div>
    )
}

export default PlanList;