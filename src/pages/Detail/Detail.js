import React, { useEffect, useRef, useState } from 'react';
import './Detail.scss';
import 'react-datepicker/dist/react-datepicker.module.css';
// import Chat from '../../components/Chat/Chat';
import Refund from '../../components/Refund/Refund';
import CalendarApp from '../../components/CalendarApp/CalendarApp';
import { useNavigate } from 'react-router-dom';

const { kakao } = window;

const Detail = () => {
  const [people, setPeople] = useState(1);
  const [reservations, setReservations] = useState([]);
  const [classDetail, setClassDetail] = useState({});
  const [scheduleId, setScheduleId] = useState('');
  const container = useRef();
  const navigate = useNavigate();

  const reserveSubmit = (reservation) => {
    setReservations([...reservations, reservation]);
  };

  useEffect(() => {
    fetch(`http://10.58.52.127:8000/classes/2`, {
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsIm5hbWUiOiLquYDrrLjsmIEiLCJlbWFpbCI6Im1uNTJpbEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIrODIgMTAtNzU2Ni0xMDA1IiwiaWF0IjoxNjk5ODgwNzQ3LCJleHAiOjE3MDA2MDA3NDd9.LdYhYyzRlxH-Q0PwKSbWwLJPeQ7pyKI_Vckkto6iHIE',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClassDetail(data.message);
      });
  }, []);

  const initMap = () => {
    const options = {
      center: new kakao.maps.LatLng(
        classDetail.latitude,
        classDetail.longitude,
      ),
      level: 3,
    };
    const map = new kakao.maps.Map(container.current, options);

    const markerPosition = new kakao.maps.LatLng(
      classDetail.latitude,
      classDetail.longitude,
    );

    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);
  };

  useEffect(() => {
    initMap();
  });

  const addPeople = () => {
    setPeople(people + 1);
  };

  const subPeople = () => {
    if (people > 1) {
      setPeople(people - 1);
    }
  };

  const copyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 링크가 복사되었습니다.');
    } catch (error) {
      alert('클립보드 복사에 실패하였습니다.');
    }
  };

  const joinClass = () => {
    fetch(`http://10.58.52.158:8000/orders/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsIm5hbWUiOiLquYDrrLjsmIEiLCJlbWFpbCI6Im1uNTJpbEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtMTIzNC01NTU1Iiwicm9sZSI6InVzZXJzIiwiaWF0IjoxNzAwMTk2NDMwLCJleHAiOjE3MDA5MTY0MzB9.WVYdWKjcFjLTyFQdPEKhLsy-XcmUa1B-cNfEcr1WOeI',
      },
      body: JSON.stringify({
        classId: classDetail.id,
        hostId: classDetail.hostId,
        scheduleId: scheduleId,
        quantity: people,
        price: classDetail.price * people,
        email: 'wecode@wecode.com',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'ORDER_COMPLETED') {
          alert('강의를 신청하였습니다.');
          navigate('/');
        } else if (data.message === 'NO_SEATS_LEFT') {
          alert('마감인원을 초과하였습니다.');
        }
      });
  };

  const addWishList = () => {
    fetch('http://10.58.52.140:8000/likes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsIm5hbWUiOiLquYDrrLjsmIEiLCJlbWFpbCI6Im1uNTJpbEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtMTIzNC01NTU1Iiwicm9sZSI6InVzZXJzIiwiaWF0IjoxNzAwMTk2NDMwLCJleHAiOjE3MDA5MTY0MzB9.WVYdWKjcFjLTyFQdPEKhLsy-XcmUa1B-cNfEcr1WOeI',
      },
      body: JSON.stringify({
        classId: classDetail.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'REQUEST_ACCEPTED') {
          alert('위시리스트에 추가하였습니다.');
        }
      });
  };

  return (
    <div className="detail">
      <div className="container">
        <div className="header">
          <div className="headerTitle">Class Page</div>
        </div>

        <div className="content">
          <img
            alt="클래스 사진"
            className="classImage"
            src={classDetail.main_image_source}
          />

          <div className="simpleDetail">
            <div className="classTitle">{classDetail.title}</div>
            <div className="classOpener">{classDetail.name}</div>
            <div className="classCategory">
              {classDetail.top_category_name}({classDetail.sub_category_name})
            </div>
            <div className="classLocation">
              <div className="locationWriting">
                <div className="locationLabel">{classDetail.address}</div>
                <button
                  className="copyAddress"
                  onClick={() => copyClipBoard(classDetail.address)}
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
              <button className="addClass" onClick={joinClass}>
                강의 신청
              </button>
              <button className="addWish" onClick={addWishList}>
                찜
              </button>
            </div>
          </div>

          <div className="calendar">
            <div className="reserve">
              <CalendarApp
                onReserve={reserveSubmit}
                scheduleInfo={classDetail.schedule_info}
                scheduleId={setScheduleId}
                people={people}
              />
            </div>
          </div>
        </div>
        <div className="classDetail">
          <div className="summary">{classDetail.summary}</div>
          <img src={classDetail.sub_image_source} alt="서브이미지" />
          <div className="content">{classDetail.content}</div>
        </div>

        <Refund />

        {/* <Chat /> */}
      </div>
    </div>
  );
};

export default Detail;
