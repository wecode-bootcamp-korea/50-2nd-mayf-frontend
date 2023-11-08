import React, { useEffect } from 'react';
import './Check.scss';
import CheckImage from './Left arrow long.png';
const { kakao } = window;

const Check = () => {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.50637032453994, 127.05365992775118),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
  }, []);
  return (
    <div className="check">
      <div className="container">
        <div className="header">
          <img src={CheckImage} alt="체크표시" />
          <div className="headerTitle">예약이 완료되었습니다</div>
        </div>

        <div className="content">
          <img
            src="https://img.freepik.com/free-photo/top-view-arrangement-of-natural-material-stationery_23-2148898233.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699142400&semt=ais"
            alt="책상 사진"
          />
          <div className="contentDetail">
            <div className="contentTitle">강의 1</div>
            <div className="contentPlanner">강의자</div>
            <div className="contentTime">강의 시간</div>
            <div className="contentLocation">
              <div className="contentLabel">
                <div>강의 위치</div>
                <button>주소 복사</button>
              </div>
              <div className="map" id="map" />
            </div>
            <div className="contentCategory">강의 카테고리</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Check;
