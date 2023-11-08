import React, { useEffect, useState } from 'react';
import './Detail.scss';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.module.css';

const { kakao } = window;

const Detail = () => {
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
  }, []);

  return (
    <div className="detail">
      <div className="container">
        <div className="header">
          <div className="headerTitle">Class Page</div>
        </div>

        <div className="content">
          <div className="classImage">
            <img
              src="https://img.freepik.com/free-photo/top-view-arrangement-of-natural-material-stationery_23-2148898233.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699142400&semt=ais"
              alt="클래스 사진"
            />
          </div>

          <div className="simpleDetail">
            <div className="classTitle">강의 1</div>
            <div className="classLocation">
              <div className="locationWriting">
                <div>강의 위치</div>
                <button>주소 복사</button>
              </div>
              <div className="map" id="map" />
            </div>
            <div className="classCategory">강의 카테고리</div>
            <div className="selectPeople">
              <button>-</button>
              <div>1명</div>
              <button>+</button>
            </div>
            <div className="buttons">
              <button className="addClass">강의 신청</button>
              <button className="addWish">찜</button>
            </div>
          </div>
        </div>

        <div className="date">
          <DatePicker
            locale={ko}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            className="datePicker"
          />
        </div>

        <div className="classDetail">상세 정보</div>

        <div className="classRefund">환불 규정</div>
      </div>
    </div>
  );
};

export default Detail;
