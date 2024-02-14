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
- 사용자가 입력한 가격, 별점, 리뷰개수 가중치를 수식 과정을 거쳐 가중 평균을 계산하여 고나광지별로 점수 계산
- 가장 높은 가중 평균 스코어를 가진 관광지와 유사한 관광지를 유클리디안 거리를 활용하여 유사한 관광지 50개를 추천

### 일자별로 관광지 설정
- 첫째날 시작위치를 제주공항으로 설정
- 사용자 일자별 숙소위치를 각 일자별 시작위치로 설정
- 사용자 일자별 시작위치와 사용자가 선택한 모든 관광지의 직선거리를 계산
- 각 일자별로 시작 위치에서 가장 가까운 관광지 3개씩 할당
  
## 5. ERD
![](https://www.notion.so/521070a85365433abab593423e9bf28e?pvs=4#e37d101e155242c293474c6257c11c30)

## 6. 기능 소개

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

[DATA]

[FRONT-END]

