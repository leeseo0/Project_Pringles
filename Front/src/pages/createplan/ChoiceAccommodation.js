import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ChoiceAccommodation() {
    const [hostels, setHostels] = useState([]);
    const [selectedHostels, setSelectedHostels] = useState([]);   // 선택된 숙소 저장
    const [currentPage, setCurrentPage] = useState(0);   // 현재 페이지
    const [pageSize, setPageSize] = useState(15);   // 페이지 크기
    const [totalPages, setTotalPages] = useState(0);   // 전체 페이지 수
    const navigate = useNavigate();

    // 숙소 목록 호출
    useEffect(() => {
        // 서버에서 페이징된 숙소 목록을 가져오는 요청
        axios.get(`http://localhost:8080/createplan/choiceaccommodation?page=${currentPage}&size=${pageSize}`)
        // axios.get("http://localhost:8080/createplan/choiceaccommodation")
        .then((response) => {
            const {content, totalPages} = response.data;
            // console.log(response.data);
            // setHostels(response.data);
            setHostels(content);
            setTotalPages(totalPages);
        })
        .catch((error) => {
            console.error('Error fetching data :', error)
        });
    }, [currentPage, pageSize]);

    // 선택한 날짜 정보 읽어오기
    const location = useLocation();
    // const {selectedStartDate, selectedEndDate} = location.state;
    const selectedStartDate = location.state.startDate;
    const selectedEndDate = location.state.endDate;


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

    // 다음 페이지 이동 및 선택한 날짜, 숙소 정보 전달
    const moveNextClick = () => {
        navigate('/createplan/choicerecommedYN', {state: {selectedStartDate, selectedEndDate, selectedHostels}});
    }

    // 선택 버튼 클릭 시 호출되는 함수
    const handleHostelSelect = (hostel) => {
        setSelectedHostels([...selectedHostels, hostel]);
    }
    
    
    // 숙소가 잘 선택되는지 확인
    console.log(selectedHostels)
    console.log(selectedStartDate)

    return (
        <div>
            <h2><b>숙소를 선택하세요</b></h2>
            <p><b>추가작업)</b> 선택여부, 클릭(선택)한 숙소 DB에 저장되도록, 페이지 번호로 뜨게끔 pagination 작업</p>
            <br/>
            <div>
                {hostels.map((hostel) => {
                    return (
                        <ul key={hostel.hostel_id}>
                            <li>
                                <h4>Name: {hostel.name}</h4>
                                <p>Type: {hostel.type}</p>
                                <p>Address: {hostel.address1}</p>
                                <p>⭐: {hostel.rating}</p>
                                <button onClick={() => handleHostelSelect(hostel)}>선택</button>
                            </li>
                        </ul>
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
            {/* <div className="pagination">
                {Array.from({ length:totalPages }, (_, index) => (
                    <button key={index} onClick={() => handlePageChange(index)}>
                        {index + 1}
                    </button>
                ))}
            </div> */}
            <hr/>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
                <button type="button" className="btn btn-outline-secondary" onClick={moveNextClick}>다음</button>
            </div>
        </div>
    )
}

export default ChoiceAccommodation;