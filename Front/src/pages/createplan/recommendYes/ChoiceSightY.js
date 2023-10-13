import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ChoiceSight() {
    const [sights, setSights] = useState([]);
    const [selectedSights, setSelectedSights] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);   // 현재 페이지
    const [pageSize] = useState(15);   // 페이지 크기
    const [totalPages, setTotalPages] = useState(0);   // 전체 페이지 수
    const navigate = useNavigate();

    // 선택한 날짜, 숙소, 추천여부, 가중치 정보 읽어오기
    const location = useLocation();
    const {selectedStartDate, selectedEndDate, selectedHostels, selectedRecommedYn, inputPriceWeight, inputRatingWeight, inputReviewWeight} = location.state;
    // const selectedStartDate = location.state.startDate;
    // const selectedEndDate = location.state.endDate;
    // const selectedHostels = location.state.selectedHostels;
    console.log(selectedHostels)
    console.log('추천여부:', selectedRecommedYn)
    console.log('가격 가중치: ', inputPriceWeight)
    
    // 관광지 목록 호출
    useEffect(() => {
        // 서버에서 페이징된 숙소 목록을 가져오는 요청
        axios.get(`http://localhost:8080/createplan/choicesights?page=${currentPage}&size=${pageSize}`)
        // axios.get("http://localhost:8080/createplan/choicesights")
        .then((response) => {
            const {content, totalPages} = response.data;
            // console.log(response.data);
            // setSights(response.data);
            setSights(content);
            setTotalPages(totalPages);
        })
        .catch((error) => {
            console.error('Error fetching data :', error)
        });
    }, [currentPage, pageSize]);

    // 페이지 번호 목록 생성
    const pageNumbers = [];
    for (let i = currentPage - 3; i <= currentPage + 3; i++) {
        if (i >= 0 && i < totalPages) {
            pageNumbers.push(i);
        }
    }

    // 페이지 번호 이전으로 이동
    const moveToPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    // 페이지 번호 다음으로 이동
    const moveToNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

    // 페이지 변경 함수
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    }

    // 다음 페이지 이동 및 선택한 날짜, 숙소, 추천여부, 가중치, 관광지 정보 전달
    const moveNextClick = () => {
        navigate('/createplan/y/choicetransportation', {state: {selectedStartDate, selectedEndDate, selectedHostels, selectedRecommedYn : 'Y', inputPriceWeight, inputRatingWeight, inputReviewWeight, selectedSights}})
    }

    // 선택 버튼 클릭 시 호출되는 함수
    const handleSightSelect = (sight) => {
        setSelectedSights([...selectedSights, sight]);
    }

    return (
        <div className="container my-3">
            <h2><b>관광지 선택</b></h2>
            <br/>
            <div>
                {sights.map((sight) => {
                    return (
                        <div key={sight.sight_id} style={{display:'flex', alignItems:'center'}}>
                            <div>
                                <h5><b>Name: {sight.name}</b></h5>
                                <p>Type: {sight.type}</p>
                                <p>Address: {sight.address1}</p>
                                <p>⭐: {sight.rating}</p>
                            </div>
                            <button style={{borderRadius:'5px', borderColor:'lightgray', marginLeft:'10px'}} className='btn btn-outline-secondary' onClick={() => handleSightSelect(sight)}>+</button>
                        </div>
                    )
                })}
            </div>
            <div className="pagination justify-content-center">
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={moveToPreviousPage} disabled={currentPage === 0}>이전</button>
                    </li>
                    {pageNumbers.map((page) => (<li key={page} className={`page-item ${page === currentPage ? "active" : ""}`}>
                        <button className="page-link" onClick={() => handlePageChange(page)}>{page + 1}</button>
                    </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages - 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={moveToNextPage} disabled={currentPage === totalPages - 1}>다음</button>
                    </li>
                </ul>
            </div>
            <hr/>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
                <button type="button" className="btn btn-outline-secondary" onClick={moveNextClick}>다음</button>
            </div>
        </div>
    )
}

export default ChoiceSight;