# Final_Pringles


## 1. 기획 배경 및 프로젝트 소개
### 사용자 선호도와 위치 기반에 따른 제주 관광지 추천 및 일정 생성 
- 기간: 23.08.22 ~ 23.10.23
- 코로나19로 인해 국내 여행 수요 감소하였다가 코로나19가 완화됨에 따라 국내 여행 수요 및 소비 증가
- 그 중 국내 여행 중 제주도 여행 선정
- 제주도 여행지 선택과 여행 계획 수립에 어려움을 느끼는 사람들이 많음
- 제주도 여행은 가고 싶지만 어디로 가야될지 모르겠는 사용자를 위한 사용자의 선호도와 일정 맞춤형 여행 일정 추천
  
## 2. 팀원

|이름 |[김지현](https://github.com/kjjh714)|[이경주](https://github.com/kzoou2)|[이서영](https://github.com/leeseo0)|
|---|------------|------------|------------|
|포지션|Back-end<br/>Front-end|Back-end <br/> Front-end |Data <br/>  Front-end|
||- 데이터베이스 설계 및 연동 <br/>- SpringBoot 활용한 회원가입 / 로그인 <br/>- 게시글 CRUD 구현 <br/> - 웹페이지 설계 및 구현 <br/> - FE 작업|-  데이터 크롤링 및 전처리  <br/> - Kakao map API 연동  <br/> - 관광지 CRUD 구현 <br/> - 웹디자인 설계 및 구현  <br/> - FE 작업|- 데이터 크롤링/전처리/시각화 <br/>- 관광지 추천 및 일정 생성  Fast API구축 <br/> - Kakao map API 연동 <br/> - FE 작업|

## 3. 주요 자료(데이터)
- 네이버 지도 크롤링
- 테마별 키워드 검색
  - 관광지
  - 자연
  - 체험/액티비티
  - 문화/예술/역사
  - 소품샵
  - 식당/카페
  - 숙소
  
- 크롤링 정보
  - 이름
  - 유형
  - 별점,
  - 리뷰 개수
  - 도로명/지번 주소
  - 전화번호
  - 영업시간
  - 메뉴/이용권
  - 이미지
    
## 4. 일정 생성
### 관광지 추천
- 크롤링한 관광지 데이터에서 가격, 별점, 리뷰개수를 정제, 정규화
- 사용자가 [가격, 별점, 리뷰 개수] 중요도를 선택
- 사용자가 입력한 가격, 별점, 리뷰개수 가중치를 수식 과정을 거쳐 가중 평균을 계산하여 관광지별로 점수 계산
- 가장 높은 가중 평균 스코어를 가진 관광지와 유사한 관광지를 유클리디안 거리를 활용하여 유사한 관광지 50개를 추천

### 일자별로 관광지 설정
- 첫째날 시작위치를 제주공항으로 설정
- 사용자 일자별 숙소위치를 각 일자별 시작위치로 설정
- 사용자 일자별 시작위치와 사용자가 선택한 모든 관광지의 직선거리를 계산
- 각 일자별로 시작 위치에서 가장 가까운 관광지 3개씩 할당
  
## 5. ERD
<img src="https://github.com/kzoou2/Project_Pringles/assets/137479578/1e3b0809-8ae6-4b0d-805c-1fed7dc6da01" width="65%" height="50%" />

## 6. 기능 소개
|구분 |기능|설명|
|---------|-------|----------------|
|회원|- 회원가입 <br/> - 로그인&로그아웃 |- ID, PW, 닉네임 작성을 통한 회원 관리|
|마이페이지|- 사용자 여행 일정 <br/> - 관광지 북마크 목록 |- 사용자가 생성한 여행 일정 기록 목록 확인 <br/> - 사용자가 북마크 표시한 관광지 목록 확인|
|여행 일정 생성|- 사용자 맞춤 키워드에 따른 관광지 추천 및 일정 생성 |- 날짜 선택 → 숙소 선택 → 사용자 선호도 선택  <br/> - 사용자가 입력한 가중치 활용한 관광지 추천 <br/> - 사용자 일자별 시작 위치와 선택한 모든 관광지의 직선거리 계산  <br/>- 일자별로 관광지 3개씩 할당 <br/>- 선택한 관광지에 의한 일정 생성 및 스팟마다 지도 직선 표시 |
|관광지 조회|- 추천 관광지 상세정 |-해당 관광지 카카오 맵 마커 및 지도 표시 <br/> - 여행지 주소, 소개 등 기본 정보 조회 |
|게시판|- QnA 게시판 <br/> - 여행 계획 공유게시판 |-질문 작성 및 답변 작성, 수정 <br/> - 나의 여행 계획 공유 및 다른 사용자의 여행 계획 조회 |

<br/>

### 🟠회원

- 회원가입
<img src="https://github.com/kzoou2/Project_Pringles/assets/137479578/ec5cc999-4037-447b-a305-a6620335775e" width="60%" height="100%" />

- 로그인
<img src="https://github.com/kzoou2/Project_Pringles/assets/137479578/97bad744-f4d7-4be2-a54b-04e11e8da52c" width="60%" height="100%"  />



### 🟠마이페이지

- 마이페이지
<img src="https://github.com/kzoou2/Project_Pringles/assets/137479578/e8a72992-3da1-44c4-a256-f2174785a99b" width="60%" height="100%" />
  
- 전체 일정 목록
  <div>
    <img src="https://github.com/kzoou2/Project_Pringles/assets/137479578/4a97fe9d-e1ca-424e-b7c8-98fb13d788ba" width="47%" height="100%"/> <img src="https://github.com/kzoou2/Project_Pringles/assets/137479578/b173f4f2-44ac-4359-97c0-1459e44a1fc6" width="47%" height="100%"/>
  </div>
  
- 공유게시판
<img src="https://github.com/kzoou2/Project_Pringles/assets/137479578/7f28b649-3a18-40a2-a6cf-9feb9a785a89" width="60%" height="100%" />
  
- 북마크 목록
  <div>
    <img src="https://github.com/kzoou2/Project_Pringles/assets/137479578/b0e4e1e7-ce19-4903-9d78-eed5ec4529f6" width="47%" height="100%"/> <img src="https://github.com/kzoou2/Project_Pringles/assets/137479578/cfdf010f-34a7-44fb-bb9e-43c9e8482e17" width="47%" height="100%"/>
  </div>



### 🟠여행 일정 생성

- 날짜 선택
<img src="https://github.com/kzoou2/Project_Pringles/assets/137479578/06ffad9a-872b-494b-b13e-c89455281fa4" width="60%" height="100%"/>

- 숙소 선택
<img src="https://github.com/kzoou2/Project_Pringles/assets/137479578/dec1e6a1-e095-4c83-b37c-68cd2152a010"  width="60%" height="100%"/>

- 일정 추천 여부
<img src="https://github.com/kzoou2/Project_Pringles/assets/137479578/ba7b3903-4665-488c-b808-c14ee8e04842"  width="60%" height="100%"/>

- 사용자 선호도 조사
<img src="https://github.com/kzoou2/Project_Pringles/assets/137479578/175c6e0c-a007-4d7c-999c-30396bb64b5a"  width="60%" height="100%"/>

- 사용자가 입력한 가중치 활용한 관광지
<img src="https://github.com/kzoou2/Project_Pringles/assets/137479578/175c6e0c-a007-4d7c-999c-30396bb64b5a"  width="60%" height="100%"/>

- 교통수단 선택 및 일정 제목 설정
<img src="https://github.com/kzoou2/Project_Pringles/assets/137479578/175c6e0c-a007-4d7c-999c-30396bb64b5a"  width="60%" height="100%"/>

- 일정 생성 (일자별 관광지 할당)
<img src="https://github.com/kzoou2/Project_Pringles/assets/137479578/175c6e0c-a007-4d7c-999c-30396bb64b5a"  width="60%" height="100%"/>



### 🟠관광지 조회
- 관광지 상세페이지
  <div>
    <img src="https://github.com/kzoou2/Project_Pringles/assets/137479578/dc7c13aa-34f7-4a74-bca3-72ff6b735636"  width="60%" height="100%"/> <img src="https://github.com/kzoou2/Project_Pringles/assets/137479578/04f64f97-47df-4fd7-aa38-22b1d4ea7f19"  width="60%" height="100%"/>
  </div>



### 🟠QnA게시판
<div>
  <img src="https://github.com/kzoou2/Project_Pringles/assets/137479578/bc544143-7376-4954-9548-58ca2ccc187d"  width="47%" height="100%"/> <img src="https://github.com/kzoou2/Project_Pringles/assets/137479578/c61bcce5-d930-4f19-8088-85c490e21f70"  width="47%" height="100%"/>
</div>


## 7. 시스템 아키텍처 및 기술 스택
   
<b>✔️[FRONT-END]</b>
<div>
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
</div>

<b>✔️[BACK-END / DATA]</b>
<div>
  <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white">
  <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white"> 
  <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
  <img src="https://img.shields.io/badge/fastapi-009688?style=for-the-badge&logo=fastapi&logoColor=white">
  <img src="https://img.shields.io/badge/jupyter-F37626?style=for-the-badge&logo=jupyter&logoColor=white"> 
  <img src="https://img.shields.io/badge/numpy-013243?style=for-the-badge&logo=numpy&logoColor=white">
  <img src="https://img.shields.io/badge/selenium-43B02A?style=for-the-badge&logo=selenium&logoColor=white">
  <img src="https://img.shields.io/badge/pandas-150458?style=for-the-badge&logo=pandas&logoColor=white"> 
  <img src="https://img.shields.io/badge/JPA-BAAE85?style=for-the-badge&logo=JPA&logoColor=white">
  <img src="https://img.shields.io/badge/BeautifulSoup-000000?style=for-the-badge&logo=BeautifulSoup&logoColor=white">
</div>

<b>✔️[협업툴]</b>
<div>
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white">
  <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white">
  <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
</div>


## 8. 폴더 구조
[BACK-END]
```bash
├─Back
📦Back
 ┣ 📂gradle
 ┃ ┗ 📂wrapper
 ┃ ┃ ┣ 📜gradle-wrapper.jar
 ┃ ┃ ┗ 📜gradle-wrapper.properties
 ┣ 📂src
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📂java
 ┃ ┃ ┃ ┗ 📂project
 ┃ ┃ ┃ ┃ ┗ 📂finalpj
 ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BookmarkController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜HostelController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MemberController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜QuestionController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ScheduleController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜SearchController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜SharePostController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜SightController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜SpotController.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂DTO
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜AnswerDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BookmarkDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜HostelDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜QuestionDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ScheduleDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜SharePostDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜SightResponseDto.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Answer.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Bookmark.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Hostel.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Member.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Question.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Schedule.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Search.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜SharePost.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Sight.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜Spot.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜AnswerRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BookmarkRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜HostelRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MemberRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜QuestionRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ScheduleRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜SearchRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜SharePostRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜SightRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜SpotRepository.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BookmarkService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜HostelService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MemberService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ScheduleService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜SearchService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜SharePostService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜SightService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜SpotService.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📜FinalPjApplication.java
 ┃ ┃ ┃ ┃ ┃ ┗ 📜SecurityConfig.java
 ┃ ┃ ┗ 📂resources
 ┃ ┃ ┃ ┗ 📜application.properties
 ┃ ┗ 📂test
 ┃ ┃ ┗ 📂java
 ┃ ┃ ┃ ┗ 📂project
 ┃ ┃ ┃ ┃ ┗ 📂finalpj
 ┃ ┃ ┃ ┃ ┃ ┣ 📜FinalPjApplicationTests.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📜HostelRepositoryTest.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📜MemberRepositoryTest.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📜QnARepositoryTest.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📜RepositoryTest.java
 ┃ ┃ ┃ ┃ ┃ ┗ 📜ScheduleRepositoryTest.java
 ┣ 📜.gitignore
 ┣ 📜build.gradle
 ┣ 📜gradlew
 ┣ 📜gradlew.bat
 ┣ 📜README.md
 ┗ 📜settings.gradle
```
[DATA]
```bash
📦Data
 ┣ 📂__pycache__
 ┃ ┣ 📜main.cpython-311.pyc
 ┃ ┗ 📜recommend.cpython-311.pyc
 ┣ 📜database.py
 ┣ 📜main.py
 ┣ 📜model_data_cluster_visual.ipynb
 ┣ 📜model_plan.ipynb
 ┣ 📜README.md
 ┣ 📜sight_score.csv
 ┣ 📜total_hostel.csv
 ┣ 📜user_data_select.csv
 ┣ 📜user_select_sight.csv
 ┣ 📜user_weight_culcurate.ipynb
 ┗ 📜weight_model.ipynb
```
[FRONT-END]
```bash
📦Front
 ┣ 📂public
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜index.html
 ┃ ┣ 📜logo192.png
 ┃ ┣ 📜logo512.png
 ┃ ┣ 📜manifest.json
 ┃ ┗ 📜robots.txt
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📜HotelMap.js
 ┃ ┃ ┣ 📜MapContainer.js
 ┃ ┃ ┣ 📜Modal.js
 ┃ ┃ ┣ 📜ModalContainer.js
 ┃ ┃ ┣ 📜SightMaps.js
 ┃ ┃ ┗ 📜useOutSideClick.js
 ┃ ┣ 📂data+fast
 ┃ ┃ ┣ 📂__pycache__
 ┃ ┃ ┃ ┣ 📜main.cpython-311.pyc
 ┃ ┃ ┃ ┗ 📜recommend.cpython-311.pyc
 ┃ ┃ ┗ 📜main.py
 ┃ ┣ 📂fonts
 ┃ ┃ ┣ 📜Font.css
 ┃ ┃ ┣ 📜NanumSquareNeo-aLt.ttf
 ┃ ┃ ┣ 📜NanumSquareNeo-bRg.ttf
 ┃ ┃ ┣ 📜NanumSquareNeo-cBd.ttf
 ┃ ┃ ┣ 📜NanumSquareNeo-dEb.ttf
 ┃ ┃ ┗ 📜NanumSquareNeo-eHv.ttf
 ┃ ┣ 📂images
 ┃ ┃ ┣ 📜img1.jpg
 ┃ ┃ ┣ 📜img2.jpg
 ┃ ┃ ┣ 📜img3.jpg
 ┃ ┃ ┣ 📜img4.jpg
 ┃ ┃ ┣ 📜img5.jpg
 ┃ ┃ ┣ 📜img6.jpg
 ┃ ┃ ┣ 📜kakao_login.png
 ┃ ┃ ┣ 📜kakao_login_small.png
 ┃ ┃ ┣ 📜logo8.png
 ┃ ┃ ┣ 📜No.png
 ┃ ┃ ┣ 📜pinmarker.png
 ┃ ┃ ┣ 📜Plus.png
 ┃ ┃ ┣ 📜redpin.png
 ┃ ┃ ┣ 📜user.png
 ┃ ┃ ┗ 📜Yes.png
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂createplan
 ┃ ┃ ┃ ┣ 📂recommendNo
 ┃ ┃ ┃ ┃ ┣ 📜ChoiceSightN.js
 ┃ ┃ ┃ ┃ ┗ 📜ChoiceTransN.js
 ┃ ┃ ┃ ┣ 📂recommendYes
 ┃ ┃ ┃ ┃ ┣ 📜ChoiceSightY.js
 ┃ ┃ ┃ ┃ ┣ 📜ChoiceTransY.js
 ┃ ┃ ┃ ┃ ┗ 📜InputWeight.js
 ┃ ┃ ┃ ┣ 📜ChoiceAccommodation.js
 ┃ ┃ ┃ ┣ 📜ChoiceRecommendYn.js
 ┃ ┃ ┃ ┣ 📜PlanMain.js
 ┃ ┃ ┃ ┣ 📜ShowSelection.js
 ┃ ┃ ┃ ┗ 📜ShowSelectionNo.js
 ┃ ┃ ┣ 📂mypage
 ┃ ┃ ┃ ┣ 📂MyActivityPage
 ┃ ┃ ┃ ┃ ┣ 📜ReviewRecord.js
 ┃ ┃ ┃ ┃ ┣ 📜TouristSpot.js
 ┃ ┃ ┃ ┃ ┗ 📜TravelRecord.js
 ┃ ┃ ┃ ┣ 📜Bookmark.js
 ┃ ┃ ┃ ┣ 📜Mypage.js
 ┃ ┃ ┃ ┣ 📜PlanDetail.js
 ┃ ┃ ┃ ┣ 📜PlanList.js
 ┃ ┃ ┃ ┣ 📜Record.js
 ┃ ┃ ┃ ┣ 📜Review.js
 ┃ ┃ ┃ ┣ 📜Share.js
 ┃ ┃ ┃ ┣ 📜ShareDetail.js
 ┃ ┃ ┃ ┣ 📜Sidebar.js
 ┃ ┃ ┃ ┣ 📜SidebarItem.js
 ┃ ┃ ┃ ┣ 📜TouristSpot.js
 ┃ ┃ ┃ ┗ 📜UserinfoModify.js
 ┃ ┃ ┣ 📂qna
 ┃ ┃ ┃ ┣ 📜QNA.js
 ┃ ┃ ┃ ┣ 📜QNADetail.js
 ┃ ┃ ┃ ┣ 📜QuestionCreate.js
 ┃ ┃ ┃ ┗ 📜QuestionModify.js
 ┃ ┃ ┣ 📜HomeMain.js
 ┃ ┃ ┣ 📜ImageMain.js
 ┃ ┃ ┣ 📜ImageSlider.js
 ┃ ┃ ┣ 📜Login.js
 ┃ ┃ ┣ 📜Sights.js
 ┃ ┃ ┗ 📜Signup.js
 ┃ ┣ 📂style
 ┃ ┃ ┣ 📜Mypage.css
 ┃ ┃ ┣ 📜Paging.css
 ┃ ┃ ┗ 📜Sights.modul.css
 ┃ ┣ 📜.env
 ┃ ┣ 📜App.js
 ┃ ┣ 📜index.css
 ┃ ┣ 📜index.js
 ┃ ┣ 📜LoginHandler.js
 ┃ ┣ 📜Navbar.js
 ┃ ┗ 📜OAuth.js
 ┣ 📜.gitignore
 ┣ 📜main.py
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜README.md
```

                    
