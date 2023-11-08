import React, { useState, useEffect } from 'react';
import './Main.scss';

const Main = () => {
  const [classListData, setClassListData] = useState({});

  useEffect(() => {
    fetch('/data/mainMockData.json', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((result) => {
        setClassListData(result);
      });
  }, []);

  //1. const { bestClass = [], newClass = [], deadlineClass = [] } = classListData;
  // bestClass?.map = ? optional chaining

  const { bestClass, newClass, deadlineClass } = classListData;

  return (
    <div className="main">
      <img
        className="banner"
        src="https://cdn.class101.net/images/31eab75c-55e9-4484-9014-d6eb54b47959/1920xauto.webp"
        alt="banner"
      />
      <div className="proudct">
        <p className="classTitle">마감임박순</p>
        <div className="classContainer">
          {deadlineClass?.map((pro) => (
            <div key={pro.id} className="class">
              <div className="imgBox">
                <img className="classImg" alt="class" src={pro.image}></img>
              </div>
              <p className="sectionTitle">{pro.class}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="proudct">
        <p className="classTitle">인기순</p>
        <div className="classContainer">
          {bestClass?.map((pro) => (
            <div key={pro.id} className="class">
              <div className="imgBox">
                <img className="classImg" alt="class" src={pro.image}></img>
              </div>
              <p className="sectionTitle">{pro.class}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="proudct">
        <p className="classTitle">최신순</p>
        <div className="classContainer">
          {newClass?.map((pro) => (
            <div key={pro.id} className="class">
              <div className="imgBox">
                <img className="classImg" alt="class" src={pro.image}></img>
              </div>
              <p className="sectionTitle">{pro.class}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
