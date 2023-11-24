# Alcohol Free
코로나 사태로 인해 다양한 취미를 가지지 못한 사람들을 위해 다양한 종류의 원데이 클래스를 수강해봄으로써 여러 가지를 체험하게 해보고자 기획하게 되었음

## Project Overview
- 프로젝트 명 : 하루살이(MayFly)
- 프로젝트 목표 : 원데이 클래스를 개강하는 호스트와 수강하는 소비자들을 이어주는 사이트
- 기간 : 2023/11/06 ~ 2023/11/24(3주)

## Contributors
### [FE](https://github.com/wecode-bootcamp-korea/50-3rd-mayfly-frontend)
- [신희현](http://github.com/hxxhyun) : 상세 페이지 및 호스트 마이 페이지
- 최민지
- [임시현](http://github.com/jsm00929) : 카카오 소셜로그인, 카카오페이 충전, 유저 마이 페이지, 관리자 페이지

### [BE](https://github.com/wecode-bootcamp-korea/50-3rd-mayfly-backend)
- [유진서](http://github.com/coderjins)
- [이주현](http://github.com/juhyunju)
- [김문영](https://github.com/kimmunyeong)
- [노범석](https://github.com/prodigy0831)

## Tech Stack
- React
- HTML5
- CSS3
- Javascript(ES6)
- GitHub
- Trello
- Slack
- Notion

## Features
- 상세 페이지 : 원데이 클래스에 대한 상세 내용 표시, 카카오 지도 API를 통해 지도 구현, 소켓을 활용한 실시간 채팅 문의 기능
- 호스트 마이페이지 : 호스트의 개인 정보 수정, 강의 내역 표시 - 추가 - 수정 기능, 보유 크레딧을 현금화 시킬 수 있는 정산 기능(실제 현금화 X), 유저와의 실시간 채팅 기능 구현

## Preview
- 상세 페이지
<img width="1512" alt="스크린샷 2023-11-24 오후 1 23 32" src="https://github.com/wecode-bootcamp-korea/50-3rd-mayfly-frontend/assets/96459468/cef4aea6-0406-4491-9454-1af969886071">
<img width="1512" alt="스크린샷 2023-11-24 오후 1 23 39" src="https://github.com/wecode-bootcamp-korea/50-3rd-mayfly-frontend/assets/96459468/095bc914-ebf8-4b34-bf77-a984ef678248">
<img width="1512" alt="스크린샷 2023-11-24 오후 1 23 56" src="https://github.com/wecode-bootcamp-korea/50-3rd-mayfly-frontend/assets/96459468/30371cce-0995-46c2-8e1f-ceda2c72d2b1">

- 호스트 마이 페이지

## User Scenario
### 1. 회원가입 및 로그인
1. 하루살이 웹사이트 접속
2. 하루 로그인

### 2. 상품 주문
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
