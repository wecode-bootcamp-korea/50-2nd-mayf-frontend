import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyPageEventHeader from '../../components/MyPageEventHeader/MyPageEventHeader';
import MyPageEventTab from '../../components/MyPageEventTab/MyPageEventTab';
import './ClassList.scss';

const ClassList = () => {
  const [classList, setClassList] = useState([]);
  const navigate = useNavigate();

  const getClassList = () => {
    fetch(`http://34.64.172.211:8000/classes/hostclass`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClassList(data.message);
      });
  };

  useEffect(() => {
    getClassList();
  }, []);

  const deleteClass = (id) => {
    fetch(`http://34.64.172.211:8000/classes/delete/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: localStorage.getItem('token'),
      },
    }).then((res) => {
      if (res.ok) {
        getClassList();
      }
    });
  };

  return (
    <div className="classList">
      <div className="container">
        <MyPageEventHeader />
        <div className="tabs">
          <MyPageEventTab />
          <div className="box">
            <div className="label">
              <div className="pageTitle">강의 내역</div>
              <button
                className="addClassBtn"
                onClick={() => {
                  navigate('/my-page-event-addclass');
                }}
              >
                강의 추가
              </button>
            </div>

            <div className="contents">
              {classList.map((myClass) => (
                <div className="content" key={myClass.id}>
                  <img src={myClass.main_image_source} alt="이미지" />

                  <div className="classInfo">
                    <div className="className">{myClass.title}</div>

                    <div className="classCategory">
                      {myClass.top_category_name}
                    </div>
                    <div className="classLocation">{myClass.address}</div>
                  </div>

                  <div className="buttons">
                    <button
                      onClick={() => {
                        navigate(`/my-page-event-editclass/${myClass.id}`);
                      }}
                    >
                      강의 수정
                    </button>
                    <button
                      onClick={() => {
                        navigate(`/my-page-event-schedule/${myClass.id}`);
                      }}
                    >
                      스케줄 관리
                    </button>
                    <button onClick={() => deleteClass(myClass.id)}>
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassList;
