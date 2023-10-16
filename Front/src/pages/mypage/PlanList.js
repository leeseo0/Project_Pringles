import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

function PlanList() {
    const [scheduleList, setSchduleList] = useState([]);

    const navigate = useNavigate();
    
    useEffect(() => {
        async function getPlanList() {
            
            try {
                const result = await axios.get(`http://localhost:8080/mypage/planlist/${window.localStorage.getItem("userid")}`);
                console.log(result);
                setSchduleList(result.data);
                console.log(scheduleList);
            } catch (error) {
                console.log(error);
            }
        }
        getPlanList();
    }, [])

    // console.log(scheduleList.map((schedule) => schedule.schedule_id));
    
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
            <h4><b>일정 목록</b></h4>
            <table className="table table-hover text-center my-3">
                <thead className="table-dark">
                    <tr>
                        <th>No</th>
                        <th>제목</th>
                        <th>일정</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {scheduleList.map((schedule, index) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>
                                    <Link to={`/mypage/planlist/plan/${schedule.schedule_id}`} style={{textDecoration:'none'}}>{schedule.title}</Link>
                                </td>
                                <td>
                                    {schedule.startDate} - {schedule.endDate}
                                </td>
                                <div>
                                <div>
                                    <td>
                                        <div style={{display:'flex', justifyContent:'center'}}>
                                            <button 
                                                onClick={() => deleteClick(schedule.schedule_id)}
                                                type="button" className="btn btn-outline-secondary btn-sm">
                                                삭제
                                            </button>
                                        </div>
                                    </td>
                                    </div>
                                </div>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default PlanList;