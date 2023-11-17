import React, { useEffect, useState } from 'react';
import './ClassList.scss';

const ClassList = ({ setTab }) => {
  const [classList, setClassList] = useState([]);

  const getClassList = () => {
    fetch(`http://10.58.52.154:8000/classes/hostclass`, {
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsIm5hbWUiOiLstZzrr7zsp4AiLCJlbWFpbCI6ImFsc3dsODE4NEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtNTcwNC04NDg0Iiwicm9sZSI6Imhvc3RzIiwiaWF0IjoxNzAwMTk2MjQ4LCJleHAiOjE3MDA5MTYyNDh9.djPth_b9BC8H8dNNpr3R0LnuUbC9pQ3oeYlihvzUwyA',
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

  // const viewSpecify = () => {
  //   navigate(`/detail/${id}`);
  // };

  const deleteClass = (id) => {
    fetch(`http://10.58.52.154:8000/classes/delete/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsIm5hbWUiOiLstZzrr7zsp4AiLCJlbWFpbCI6ImFsc3dsODE4NEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtNTcwNC04NDg0Iiwicm9sZSI6Imhvc3RzIiwiaWF0IjoxNzAwMTk2MjQ4LCJleHAiOjE3MDA5MTYyNDh9.djPth_b9BC8H8dNNpr3R0LnuUbC9pQ3oeYlihvzUwyA',
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
          {classList.map((myClass) => (
            <div className="content" key={myClass.id}>
              <img src={myClass.main_image_source} alt="이미지" />

              <div className="classInfo">
                <div className="className">{myClass.title}</div>

                <div className="classCategory">{myClass.top_category_name}</div>
                <div className="classLocation">{myClass.address}</div>
              </div>

              <div className="buttons">
                <button>상세 보기</button>
                <button onClick={() => deleteClass(myClass.id)}>삭제</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassList;
