import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Refund from '../../components/Refund/Refund';
import CalendarApp from '../../components/CalendarApp/CalendarApp';
import Chat from './Chat';
import './Detail.scss';

const { kakao } = window;

const Detail = () => {
  const { id } = useParams();
  const [people, setPeople] = useState(1);
  const [reservations, setReservations] = useState([]);
  const [classDetail, setClassDetail] = useState({});
  const [userData, setUserData] = useState([]);
  const [scheduleId, setScheduleId] = useState('');
  const container = useRef();
  const navigate = useNavigate();

  const reserveSubmit = (reservation) => {
    setReservations([...reservations, reservation]);
  };

  useEffect(() => {
    fetch(`http://34.64.172.211:8000/classes/${id}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClassDetail(data.message);
      });
  }, []);

  useEffect(() => {
    fetch('http://34.64.172.211:8000/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setUserData(data.userGetInfoList[0]);
      })
      .catch((error) => {
        console.error('Fetch error:', error.message);
      });
  }, []);

  const initMap = () => {
    const options = {
      center: new kakao.maps.LatLng(
        classDetail.latitude,
        classDetail.longitude,
      ),
      level: 1,
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
    console.log(scheduleId);
    fetch(`http://34.64.172.211:8000/orders/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
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
        } else if (data.message === 'NOT_ENOUGH_CREDITS') {
          alert('크레딧이 부족합니다.');
        }
      });
  };

  const addWishList = () => {
    fetch('http://34.64.172.211:8000/likes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
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

  const numWithComma = (a) => {
    return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="detail">
      <div className="container">
        <div className="header">
          <div className="headerTitle">{classDetail.title}</div>
        </div>

        <div className="content">
          <div className="simpleDetail">
            <div className="basicInfo">
              <img
                alt="클래스 사진"
                className="mainImage"
                src={classDetail.main_image_source}
              />

              <div className="basicDetail">
                <div className="classTitle">{classDetail.title}</div>
                <div className="classOpener">{classDetail.name}</div>
                <div className="classCategory">
                  {classDetail.top_category_name}(
                  {classDetail.sub_category_name})
                </div>
                <div className="locationLabel">{classDetail.address}</div>
                <div
                  className="copyAddress"
                  onClick={() => copyClipBoard(classDetail.address)}
                >
                  주소 복사
                </div>
                <div className="classprice">
                  {numWithComma(classDetail.price) + ' C'}
                </div>
              </div>
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

        <div className="summaryInfo">
          <div className="label">요약</div>
          <div className="summary">{classDetail.summary}</div>
        </div>

        <div className="imagesInfo">
          <div className="label">사진</div>
          <div className="images">
            <img
              alt="클래스 사진"
              className="mainImage"
              src={classDetail.main_image_source}
            />
            <img
              src={classDetail.sub_image_source}
              className="subImage"
              alt="서브이미지"
            />
          </div>
        </div>

        <div className="contentInfo">
          <div className="label">상세 내용</div>
          <div className="contentDetail">{classDetail.content}</div>
        </div>

        <div className="mapInfo">
          <div className="label">위치</div>
          <div className="map" id="map" ref={container} />
        </div>

        <Chat
          host={classDetail.name}
          hostId={classDetail.hostId}
          userId={userData.id}
          userName={userData.name}
        />

        <Refund />
      </div>
    </div>
  );
};

export default Detail;
