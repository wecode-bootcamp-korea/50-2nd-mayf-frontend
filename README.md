# Mayfly
코로나 사태로 인해 새롭게 등장하는 취미와 학습 트렌드를 신속하게 반영하여 사용자들에게 최신의 경험을 제공하고자 기획하게 되었음

## Project Overview
- 프로젝트 명 : 하루살이(MayFly)
- 프로젝트 목표 : 다양한 취미와 관심사에 맞는 클래스를 제공함으로써 모든 연령대와 배경을 가진 사람들에게 맞춤형 경험을 제공
- 기간 : 2023/11/06 ~ 2023/11/24(3주)
- 상세설명 : [Notion](https://www.notion.so/MAY-FLY-832bc1609d79431cbaef0182cf1fc9ec)

## Contributors
### [FE](https://github.com/wecode-bootcamp-korea/50-3rd-mayfly-frontend)
- [최민지(Project Manager)](http://github.com/fullminji) : Nav, 메인 페이지, 상품리스트 페이지
- [신희현](http://github.com/hxxhyun) : 상세 페이지, 호스트 마이 페이지
- [임시현](http://github.com/jsm00929) : 소셜로그인, 충전, 유저 마이 페이지, 관리자 페이지

### [BE](https://github.com/wecode-bootcamp-korea/50-3rd-mayfly-backend)
- [유진서(Product Manager)](http://github.com/coderjins) : 강의 및 스케줄 관련 API
- [이주현](http://github.com/juhyunju) : 이미지, 채팅 관련 API
- [김문영](https://github.com/kimmunyeong) : 강사, 수강생, 관리자 관련 API
- [노범석](https://github.com/prodigy0831) : 결제 및 QR코드 전송, 위시리스트 관련 API

<div align=center><h1>📚 TECH STACKS</h1></div>
<div align=center>
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/amazon s3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">
  <br>
  
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/sass-CC6699?style=for-the-badge&logo=sass&logoColor=white">
  <img src="https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <br>
  
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="http://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white">
  <img src="http://img.shields.io/badge/trello-0052CC?style=for-the-badge&logo=trello&logoColor=white">
  <img src="http://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">
</div>

## Features
- 로그인(회원가입 포함) 페이지 : 카카오 소셜로그인 API를 통해 가입, 로그인 동시에 되도록 구현
- 메인 페이지 : 배너 표시와 정렬 기준(인기순, 최신순, 마감임박순)에 따른 상품 나열
- 크레딧 충전 페이지 : 카카오페이 API를 활용하여 결제, 크레딧을 충전하도록 구현
- 유저 마이페이지 : 유저 개인 정보 수정, 예약한 강의 내역 표시/취소/카카오톡 본인한테 보내기 기능, 위시리스트 내역 표시/취소 기능 구현
- 관리자 페이지 : 유저 목록 조회/삭제/복구, 호스트 목록 조회/삭제/복구, 클래스 목록 조회/삭제/복구/클래스별 상세 정보 모달창을 통해 조회 구현
- 리스트 페이지 : Nav에서 메인 카테고리 클릭시 해당되는 상품 리스트 페이지, 최근 본 상품 기능 구현, 정렬 및 검색바 기능 구현, 서브 카테고리 필터 기능 구현
- 상세 페이지 : 원데이 클래스에 대한 상세 내용 표시, 카카오 지도 API를 통해 지도 구현, Socket.io를 활용한 실시간 채팅 문의 기능, 스케줄과 인원수를 통한 강의 신청
- 호스트 마이페이지 : 호스트의 개인 정보 수정, 강의 내역 표시 / 추가(이미지 S3 업로드 후 S3에서 받은 URL 업로드) / 수정 기능(이미지 S3업로드 후 S3에서 받은 URL 업로드), 보유 크레딧을 현금화 시킬 수 있는 정산 기능(실제 현금화 X), Socket.io를 활용하여 유저와의 실시간 채팅 기능 구현

## Preview
[Youtube Link](https://www.youtube.com/watch?v=cVoA37Jss4o)

### User
![유저 프리뷰(고품질)](https://github.com/wecode-bootcamp-korea/50-3rd-mayfly-frontend/assets/96459468/d7c67f8e-4e5d-40d9-aeb2-5dd1851e3043){width : 300, height : 200}

### Host
![호스트 프리뷰(고품질)](https://github.com/wecode-bootcamp-korea/50-3rd-mayfly-frontend/assets/96459468/1adcaaae-cfc6-4b30-b4af-8bf5a616208b)

### Admin
![관리자 프리뷰(고품질)](https://github.com/wecode-bootcamp-korea/50-3rd-mayfly-frontend/assets/96459468/b235d8ea-2b41-48db-a12f-ee6b13e71df5)


## User Scenario
### 1. 회원가입 및 로그인
1. 하루살이 웹사이트 접속
2. 하루 로그인

### 2. 강의 신청
1. 로그인 시 이동하는 강의 리스트 페이지 이동
2. 원하는 강의 클릭
3. 상세 페이지에서 수강할 인원 수 변경
4. 해당 스케줄이 있는 날짜 선택
5. '강의 신청' 버튼을 눌러 예약

### 3. 크레딧 충전(크레딧 부족 시)
1. 유저 탭을 클릭
2. 크레딧 충전 페이지로 이동
3. 원하는 금액을 클릭 후 결제 버튼 클릭

## Host Scenario
### 1. 회원가입 및 로그인
1. 하루살이 웹사이트 접속
2. 등대 로그인

### 2. 강의 추가
1. 우측 상단 등대 탭을 클릭
2. 마이 페이지 이동
3. 강의 내역 이동
4. 강의 추가 버튼 클릭
5. 강의 내용 입력
6. 강의 추가 버튼 클릭

## 프로젝트 설치 및 실행
1. 리포지토리 클론
```
git clone https://github.com/wecode-bootcamp-korea/50-3rd-mayfly-frontend/
```

2. 의존성 패키지 설치
```
npm install
```

3. 프로젝트 실행
```
npm start
```
