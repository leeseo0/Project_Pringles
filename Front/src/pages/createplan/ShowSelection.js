import { useLocation } from "react-router-dom";

function ShowSelection() {

    // 선택한 숙소 & 관광지 & 교통수단 정보
    const location = useLocation();
    const {selectedStartDate, selectedEndDate, selectedHostels, selectedSights, selectedTrans, selectedRecommedYn, inputPriceWeight, inputRatingWeight, inputReviewWeight} = location.state;
    // const selectedStartDate = location.state.startDate;
    // const selectedEndDate = location.state.endDate;
    // const selectedHostels = location.state.selectedHostels;
    // const selectedSights = location.state.selectedSights;
    // const selectedTrans = location.state.selectedTrans;
    console.log('시작일: ', selectedStartDate)
    console.log('숙소:', selectedHostels)
    console.log('관광지:', selectedSights)
    console.log('가격 가중치: ', inputPriceWeight)
    console.log('교통수단', selectedTrans)
    
    const selectedTotal = {
        hostelName: selectedHostels.map((hostel) => hostel.name),
        sightName: selectedSights.map((sight) => sight.name),
        trans: selectedTrans,
    };

    console.log('토탈:', selectedTotal.hostelName);
    console.log('함수:', selectedHostels.map((hostel) => hostel.name))

    return (
        <>
        {/* 일정 */}
            <div>
                <h5>시작일 : {selectedStartDate.toLocaleDateString()}</h5>
                <h5>종료일 : {selectedEndDate.toLocaleDateString()}</h5>
            </div>
        {/* 숙소 */}
            <div>
                <h5>숙소명 : {selectedTotal.hostelName.join(", ")}</h5>
                
                {/* {selectedHostels.map((selectedHostel) => {
                    return (
                        <h5>숙소명: {selectedHostel.name}</h5>
                    )
                })} */}

                {/* {selectedHostels && (
                    <ul>
                        <li key={selectedHostels.hostel_id}>
                            <h5>숙소명 : {selectedHostels.name}</h5>
                        </li>
                    </ul>
                )} */}
            </div>
            <br/>
        {/* 관광지 */}
            <div>
                <h5>관광지 : {selectedTotal.sightName.join(", ")}</h5>
                {/* {selectedSights.map((selectedSight) => {
                    return (
                        <h5>관광지 : {selectedSight.name}</h5>
                    )
                })} */}

                {/* {selectedSights && (
                    <ul>
                        <li key={selectedSights.sight_id}>
                            <h5>관광지 : {selectedSights.name}</h5>
                        </li>
                    </ul>
                )} */}
            </div>
            <br/>
        {/* 교통수단 */}
            <div>
                <h5>교통수단 : {selectedTotal.trans}</h5>
                {/* {selectedTrans && (
                    <div>
                        <h5>교통수단 : {selectedTrans}</h5>
                    </div>
                )} */}
            </div>
        </>
    )
}

export default ShowSelection;