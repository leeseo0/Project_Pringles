import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

function PlanList() {
    const [scheduleList, setSchduleList] = useState([]);

    const params = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        async function getPlanList() {
            try {
                const result = await axios.get("http://localhost:8080/mypage/planlist");
                console.log(result);
                setSchduleList(result.data);
            } catch (error) {
                console.log(error);
            }
        }
        getPlanList();
    }, [])

    console.log(scheduleList.map((schedule) => schedule.schedule_id));
    
    const deleteClick = async (scheduleId) => {
        try {
            await axios.delete(`http://localhost:8080/mypage/planlist/plan-delete/${scheduleId}`);
            alert("삭제 되었습니다");
            navigate("/mypage/planlist");
        } catch (error) {
            alert("네트워크 문제로 삭제가 되지 않았습니다.");
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
                        // const deleteClick = async (scheduleId) => {
                        //     try {
                        //         await axios.delete(`http://localhost:8080/mypage/planlist/plan-delete/${scheduleId}`);
                        //         alert("삭제 되었습니다.");
                        //         navigate("/mypage/planlist");
                        //     } catch (error) {
                        //         alert("네트워크 문제로 삭제가 되지 않았습니다.");
                        //     }
                        // }
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>
                                    <Link to={`/mypage/planlist/${schedule.schedule_id}`} style={{textDecoration:'none'}}>{schedule.title}</Link>
                                </td>
                                <td>
                                    {schedule.startDate} - {schedule.endDate}
                                </td>
                                <div>
                                <div>
                                    <td>
                                        <div style={{display:'flex', justifyContent:'center'}}>
                                            <button type="button" className="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">삭제</button>
                                        </div>
                                    </td>

                                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered modal-sm">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>

                                            <div class="modal-body">삭제하시겠습니까?</div>

                                            <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
                                            <button onClick={() => deleteClick(schedule.schedule_id)} class="btn btn-primary">확인</button>
                                            {/* 확인 누르면 DB에서 삭제되도록 */}
                                            </div>
                                        </div>
                                        </div>
                                    </div>
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