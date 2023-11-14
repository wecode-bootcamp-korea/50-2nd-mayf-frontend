import React, { useEffect, useState } from 'react';
import './ClassList.scss';
import { useNavigate } from 'react-router-dom';

const ClassList = ({ setTab }) => {
  const [classList, setClassList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${URL.Main}`, {
      headers: {
        Authorization: '',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClassList(data);
      });
  }, []);

  const viewSpecify = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="classList">
      <div className="container">
        <div className="label">
          <div className="pageTitle">강의 내역</div>
          <button
            className="addClassBtn"
            onClick={() => {
              setTab(4);
            }}
          >
            강의 추가
          </button>
        </div>

        <div className="contents">
          {classList.map((data) => (
            <div className="content">
              <img src={data.image} alt="이미지" />

              <div className="classInfo">
                <div className="className">{data.title}</div>
                <div className="classOpener">{data}</div>
                <div className="classCategory">{data.category}</div>
                <div className="classLocation">{data.location}</div>
              </div>

              <div className="buttons">
                <button>상세 보기</button>
                <button>삭제</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassList;
