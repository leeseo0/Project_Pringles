import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ChoiceSight() {
    const [sights, setSights] = useState([]);
    const [selectedSights, setSelectedSights] = useState([]);
    const navigate = useNavigate();

    // 선택한 날짜, 숙소 정보 읽어오기
    const location = useLocation();
    const {selectedStartDate, selectedEndDate, selectedHostels, selectedRecommedYn} = location.state;
    // const selectedStartDate = location.state.startDate;
    // const selectedEndDate = location.state.endDate;
    // const selectedHostels = location.state.selectedHostels;
    console.log(selectedHostels)
    console.log(selectedRecommedYn)
    
    // 관광지 목록 호출
    useEffect(() => {
        axios.get("http://localhost:8080/createplan/choicesights")
        .then((response) => {
            console.log(response.data);
            setSights(response.data);
        })
        .catch((error) => {
            console.error('Error fetching data :', error)
        });
    }, []);

    // 다음 페이지 이동 및 선택한 숙소&관광지 정보 전달
    const moveNextClick = () => {
        navigate('/createplan/n/choicetransportation', {state: {selectedStartDate, selectedEndDate, selectedHostels, selectedRecommedYn, selectedSights}})
    }

    // 선택 버튼 클릭 시 호출되는 함수
    const handleSightSelect = (sight) => {
        setSelectedSights([...selectedSights, sight]);
    }

    console.log(selectedSights)

    return (
        <div>
            <h2><b>관광지 선택</b></h2>
            <br/>
            <div>
                {sights.map((sight) => {
                    return (
                        <ul>
                            <li key={sight.sight_id}>
                                    <h4>Name: {sight.name}</h4>
                                    <p>Type: {sight.type}</p>
                                    <p>Address: {sight.address1}</p>
                                    <p>⭐: {sight.rating}</p>
                                    <button className='btn btn-outline-secondary' onClick={() => handleSightSelect(sight)}>선택</button>
                            </li>
                        </ul>
                    )
                })}
            </div>
            <hr/>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
                <button type="button" className="btn btn-outline-secondary" onClick={moveNextClick}>다음</button>
            </div>
        </div>
    )
}

export default ChoiceSight;