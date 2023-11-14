import React, { useEffect, useRef, useState } from 'react';
import './Detail.scss';
import 'react-datepicker/dist/react-datepicker.module.css';
import Chat from '../../components/Chat/Chat';
import Refund from '../../components/Refund/Refund';
import CalendarApp from '../../components/CalendarApp/CalendarApp';

const { kakao } = window;

const Detail = () => {
  const [people, setPeople] = useState(1);
  const [reservations, setReservations] = useState([]);
  const container = useRef();

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const reserveSubmit = (reservation) => {
    setReservations([...reservations, reservation]);
  };

  const initMap = () => {
    const options = {
      center: new kakao.maps.LatLng(37.572662, 126.979295),
      level: 1,
    };
    const map = new kakao.maps.Map(container.current, options);

    const markerPosition = new kakao.maps.LatLng(37.572662, 126.979295);

    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);
  };

  useEffect(() => {
    initMap();
  }, []);

  const addPeople = () => {
    setPeople(people + 1);
  };

  const subPeople = () => {
    if (people > 1) {
      setPeople(people - 1);
    }
  };

  const address = '서울특별시 강남구 테헤란로 340';

  const copyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 링크가 복사되었습니다.');
    } catch (error) {
      alert('클립보드 복사에 실패하였습니다.');
    }
  };

  return (
    <div className="detail">
      <div className="container">
        <div className="header">
          <div className="headerTitle">Class Page</div>
        </div>

        <div className="content">
          <img
            src="https://img.freepik.com/free-photo/top-view-arrangement-of-natural-material-stationery_23-2148898233.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699142400&semt=ais"
            alt="클래스 사진"
            className="classImage"
          />

          <div className="simpleDetail">
            <div className="classTitle">강의 1</div>
            <div className="classOpener">강의자</div>
            <div className="classCategory">강의 카테고리</div>
            <div className="classLocation">
              <div className="locationWriting">
                <div className="locationLabel">{address}</div>
                <button
                  className="copyAddress"
                  onClick={() => copyClipBoard(address)}
                >
                  주소 복사
                </button>
              </div>
              <div className="map" id="map" ref={container} />
            </div>
            <div className="selectPeople">
              <button onClick={subPeople}>-</button>
              <div>{people}명</div>
              <button onClick={addPeople}>+</button>
            </div>
            <div className="buttons">
              <button className="addClass">강의 신청</button>
              <button className="addWish">찜</button>
            </div>
          </div>

          <div className="calendar">
            <div className="reserve">
              <h1>예약 관리 시스템</h1>
              <CalendarApp onReserve={reserveSubmit} />
              <div>
                <h2>예약 목록</h2>
                <ul>
                  {reservations.map((reservation, index) => (
                    <li key={index}>
                      {`날짜: ${formatDate(reservation.date)}, 시간: ${
                        reservation.time
                      }`}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="classDetail">상세 정보</div>

        <Refund />

        <Chat />
      </div>
    </div>
  );
};

export default Detail;
