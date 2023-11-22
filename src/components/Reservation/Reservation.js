import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reservation.scss';

const Reservation = () => {
  const [reservationList, setReservationList] = useState([
    {
      title: '',
      host_name: '',
      class_day: '',
      top_category_name: '',
      sub_category_name: '',
      address: '',
      enrolled_member: '',
    },
  ]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    getReservationList();
  }, []);

  const getReservationList = () => {
    fetch('http://10.58.52.84:8000/classes/myclass', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setReservationList(data.message))
      .catch((error) => {
        console.error('Fetch error:', error.message);
      });
  };

  const handleDetail = (itemId) => {
    navigate(`/detail/${itemId}`);
  };

  const handleDelete = (itemId) => {
    fetch(`http://10.58.52.84:8000/orders/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        alert('예약이 성공적으로 취소되었습니다');
        getReservationList();
      })
      .catch((error) => {
        console.error('Fetch error:', error.message);
      });
  };

  const handleCode = (itemId) => {
    fetch(`http://10.58.52.84:8000/orders/sendme/${itemId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error.message);
      });
  };

  return (
    <div className="reservation">
      <div className="container">
        <div className="label">예약 내역</div>

        <div className="contents">
          {reservationList.map((item) => {
            return (
              <div className="content" key={item.id}>
                <img src={item.image_source} alt="classImg" />

                <div className="classInfo">
                  <div className="classTitle">강의명 : {item.title}</div>
                  <div className="hostName">강의자 : {item.host_name}</div>
                  <div className="classTime">강의시간 : {item.class_day}</div>
                  <div className="classCategory">
                    강의 카테고리 : {item.top_category_name}(
                    {item.sub_category_name})
                  </div>
                  <div className="classLocation">
                    강의 장소 : {item.address}
                  </div>
                  <div className="classpeople">
                    인원 : {item.enrolled_member}
                  </div>
                  <div>{item.order_id}</div>
                </div>

                <div className="buttons">
                  <button onClick={() => handleDetail(item.id)}>
                    상세 보기
                  </button>
                  <button onClick={() => handleDelete(item.order_id)}>
                    예약 취소
                  </button>
                  <button onClick={() => handleCode(item.order_id)}>
                    QR코드 보내기
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Reservation;
