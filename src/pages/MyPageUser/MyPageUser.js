import React from 'react';
import './MyPageUser.scss';

const MyPageUser = () => {
  return (
    <div className="myPageUser">
      <div className="container">
        <div className="header">
          <div className="headerTitle">헤더 타이틀</div>
        </div>

        <div className="contents">
          <div className="content">
            <div className="contentTitle">정보 수정</div>
            <img
              src="https://img.freepik.com/free-photo/top-view-arrangement-of-natural-material-stationery_23-2148898233.jpg"
              alt="예시 이미지"
            />
            <button className="pageMove">페이지 이동</button>
          </div>

          <div className="content">
            <div className="contentTitle">예약 내역</div>
            <img
              src="https://img.freepik.com/free-photo/top-view-arrangement-of-natural-material-stationery_23-2148898233.jpg"
              alt="예시 이미지"
            />
            <button className="pageMove">페이지 이동</button>
          </div>

          <div className="content">
            <div className="contentTitle">위시 리스트</div>
            <img
              src="https://img.freepik.com/free-photo/top-view-arrangement-of-natural-material-stationery_23-2148898233.jpg"
              alt="예시 이미지"
            />
            <button className="pageMove">페이지 이동</button>
          </div>

          <div className="content">
            <div className="contentTitle">크레딧 페이지</div>
            <img
              src="https://img.freepik.com/free-photo/top-view-arrangement-of-natural-material-stationery_23-2148898233.jpg"
              alt="예시 이미지"
            />
            <button className="pageMove">페이지 이동</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageUser;
