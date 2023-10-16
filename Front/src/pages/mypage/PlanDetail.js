import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PlanDetail() {
    const [schedule, setSchedule] = useState([]);
    const params = useParams();

    useEffect(() => {
        async function getPlan() {
            try {
                const result = await axios.get(`http://localhost:8080/mypage/planlist/plan/${params.schedule_id}`);
                console.log(result);
                setSchedule(result.data);
            } catch (error) {
                console.log(error);
            }
        }
        getPlan();
    }, [params.schedule_id])

    console.log(params)


    return (
        <div className="container my-3">
            <h3 className="border-bottom py-2"><b>{schedule.startDate} - {schedule.endDate}</b></h3>
            <div className="card my-3">
                <div className="card-body">
                    <div className="card-text">
                        {schedule.accommodation}<br/>
                        {schedule.transportation}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlanDetail;