import React,{ useState } from "react";
import styled from "styled-components";
import ReviewRecord from './MyActivityPage/ReviewRecord';
import Sidebar from './Sidebar';

const PageContainer = styled.div`
  display: flex;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
//   justify-content: space-between;
  justify-content: left;
  padding: 20px;  
//   position: relative; /* 컨테이너를 상대 위치로 설정 */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* 우측 정렬 설정 */
  padding: 10px;
`;

const TextContainer = styled.div`
  width: 100%; /* 컨테이너 전체 너비를 사용하도록 설정 */
`;

const Text = styled.h2`
  font-size: 20px;
  font-weight: lighter;
  margin-bottom: 20px;
`;

const Review = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(true);  //false로 바꾸면 체크시에만 삭제버튼 생성
  const [ReviewTouristSpots, setReviewTouristSpots] = useState([
    {
      id: 1,
      name: "쇠소깍",
      image: "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20150831_76%2F1441025139566jlxeJ_JPEG%2F126362588156648_0.jpg",
      rating: 4.5,
      reviewtext: "카약 완전 재밌어요! 위에 산책로에서 보는 풍경도 예뻤는데 물에서 보는것도 너무 예쁘네여ㅠ카약 2인 2만원이고 다녀오는데 20분정도 걸리는데 완전 추천해요!!근데 대기가 길어서 오전에 미리 가서 예매하시고 다른데갔다가 와서 타는게 좋아요.저는 12:30에 예매했는데 15:00에 타러갔어요",
    },
    {
      id: 2,
      name: "용머리해안",
      image: "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20150901_66%2F14410456277055t8yW_JPEG%2F13491455_0.jpg",
      rating: 5.0,
      reviewtext: "용머리해안은 관람 가능한지 보고 방문 하셔야해요. 인스타 계정도 있고 인스타안하시는 분들은 아침에 용머리 해안 사무소쪽으로 아침에 전화해보시고 가셔야합니다. 문열렸다고 하면 무조건 가세요 두번 세번 가셔야해요. 진짜 너무 아름답거든요. 갯강구라는 바다벌레 많은데 해치지 않으니 못본척 이쁜 경관만 보세요😊",
    },
    {
      id: 3,
      name: "스누피가든",
      image: "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230111_200%2F16734217449280D9xr_JPEG%2F%25B3%25D7%25C0%25CC%25B9%25F6_%25BA%25EA%25B7%25A3%25B5%25E5%25B0%25CB%25BB%25F6_%25B8%25DE%25C0%25CE%25BD%25E6%25B3%25D7%25C0%25CF_PC_488x470_10Mb.jpg",
      rating: 4.0,
      reviewtext: "스누피가든은 제주도에서 가장 돈이 아깝지 않은 장소 중 하나인거 같아요! 실내에서 스누피의 역사의 역사부터 몰랐던 사실들까지 알아가는게 쏠쏠했고 그것들을 모두 야외에 잘 구현해두어 너무너무 즐거운 시간이었습니다 ㅎㅎ 진짜 다 돌고나니 2시간이 좀 넘더군요 꼭 추천드리고 싶어요 사진 스팟도 정말 많습니다!",
    },
    {
      id: 4,
      name: "9.81파크 제주",
      image: "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fnaverbooking-phinf.pstatic.net%2F20230719_182%2F1689732791017ByNh1_PNG%2F20203_%25B7%25B9%25C0%25CC%25BD%25CC_%25C6%25C4%25B6%25F5%25C7%25CF%25B4%25C3.png",
      rating: 3.1,
      reviewtext: "오전 아홉시 타임으로 가서 두시간 동안 실컷 재밌게 놀았어요!평일이고 휴가철은 아니라 사람이 그렇게 많이 붐비진 않았고,저는 일찍갔더니 처음에 들어가서 한시간동안 카트 5번은 탔습니다!3번이상만타도 신나고 만족할만했어요~그외에 한시간동안 여러게임 즐기며 두시간 잘 즐기다 왔어요~!!카트 최대한으로 타려면 일찍가세요~!!추천합니다!!",
    },
    {
      id: 5,
      name: "대포주상절리",
      image: "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fvideo-phinf.pstatic.net%2F20230815_8%2F1692083439344JhO5h_JPEG%2Fd62bcacf-3b3a-11ee-ba0a-48df379cc9e4_03.jpg",
      rating: 3.5,
      reviewtext: "주상절리가 아름답고 멋져요. 데크가 잘 되어있어서 걷기 편해요. 관광 보트가 너무 가까이 와서 왔다갔다 머물러서 보기 거슬려요.",
    },
    {
      id: 6,
      name: "천제연폭포",
      image: "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20150831_207%2F1440992289833tONYr_JPEG%2F11491637_0.jpg",
      rating: 3.0,
      reviewtext: "최근 제주에 비가 많이와서 운 좋게 제1폭포에도 물이 한가득있는걸 볼 수 있었어요 정말 꼭 와봐야할 곳이라고 생각합니다 너무 멋있었어요 1~3폭포를 잇는 산책로도 깔끔하고 튼튼하게 잘 되어있습니다 다만 경사가 가파르거나 계단이 많은경우가 있어서 어르신과 함께라면 제1~2 폭포만 보시길 추천드려요"
    },
    {
      id: 7,
      name: "휴애리자연생활공원",
      image: "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230904_295%2F1693806066265OCuAl_JPEG%2FKakaoTalk_20230904_143904995_01.jpg",
      rating: 4.7,
      reviewtext: "날씨좋은 10월초에 가서 핑크뮬리도 파란하늘도 실컷보고왔어요~~♡ 입장료가 있으니 예쁜포토죤에서 사진 많이 찍고오세요~~^^사람이 많긴해도 사진찍는데 지장은 없네요~",
    },
    {
      id: 8,
      name: "도두동무지개해안도로",
      image: "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200325_229%2F1585100287523Q6sGV_JPEG%2FUb-_866t13IS6lzjvWhgT8Gx.jpg",
      rating: 4.9,
      reviewtext: "제주공항에서 가까운 명소 무지개 해안도로!사진도 잘나오고 길따라 걸어도 바다가 옆에 있어서 시원하고 좋아요",
    },
  ]);

  // 체크박스를 선택할 때 선택된 항목을 관리하는 함수
  const handleCheckboxChange = (id) => {
    const index = selectedItems.indexOf(id);
    if (index === -1) {
      // 선택되지 않은 항목을 선택하면 추가
      setSelectedItems([...selectedItems, id]);
    } else {
      // 이미 선택된 항목을 선택하면 제거
      const updatedSelection = [...selectedItems];
      updatedSelection.splice(index, 1);
      setSelectedItems(updatedSelection);
    }

    // 선택된 항목이 있는 경우 삭제 버튼을 표시 selectedItems.length > 0
    // 항상 삭제 버튼 표시
    setShowDeleteButton(true);   
  };

  // 삭제 버튼을 클릭할 때 선택된 항목을 삭제하는 함수
  const handleDeleteButtonClick = () => {
    // 선택된 항목을 제거하기 위한 로직을 작성
    const updatedReviewTouristSpots = ReviewTouristSpots.filter(
      (spotreview) => !selectedItems.includes(spotreview.id)
    ); 
    // 선택된 항목을 초기화
    setSelectedItems([]); 
    // 업데이트된 목록을 ReviewTouristSpots로 설정
    setReviewTouristSpots(updatedReviewTouristSpots);
  };


  return (
    <PageContainer>
      <Sidebar /> {/* 사이드바를 여기에 추가 */}
      <Container>
        <TextContainer>
          <Text>리뷰⭐</Text>
          <ButtonContainer>
            <button>작성</button>
            <button>수정</button>
            {showDeleteButton && (
              <button onClick={handleDeleteButtonClick}>삭제</button>
            )}
          </ButtonContainer>
        </TextContainer>
        {ReviewTouristSpots.map((spotreview) => (
            <ReviewRecord
            key={spotreview.id}
            name={spotreview.name}
            imageUrl={spotreview.image}
            rating={spotreview.rating}
            reviewtext={spotreview.reviewtext}
            onCheckboxChange={() => handleCheckboxChange(spotreview.id)}
            />
        ))}
      </Container>
    </PageContainer>
  );
};

export default Review;