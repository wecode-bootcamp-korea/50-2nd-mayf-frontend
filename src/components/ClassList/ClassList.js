import React, { useEffect, useState } from 'react';
import './ClassList.scss';
import { useNavigate } from 'react-router-dom';

const ClassList = ({ setTab }) => {
  const [classList, setClassList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://10.58.52.181:8000/classes/hostclass`, {
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsIm5hbWUiOiLsnoTsi5ztmIQiLCJlbWFpbCI6ImpzbTAwOTI5QG5hdmVyLmNvbSIsInBob25lX251bWJlciI6Iis4MiAxMC05MTU5LTA1MDYiLCJpYXQiOjE2OTk5MzUyODMsImV4cCI6MTcwMDY1NTI4M30.oXtoBY1SoujOKSClsVQf2JM9QoBuhajNV1EVC3b3R4o',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClassList(data);
      });
  }, []);

  // const viewSpecify = () => {
  //   navigate(`/detail/${id}`);
  // };

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
