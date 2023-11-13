import React, { useState, useEffect } from 'react';
//import Timer from './components/Timer';
import Slide from './components/Slide';
import API from '../../config';
import './Main.scss';

const Main = () => {
  const [classListData, setClassListData] = useState({});

  useEffect(() => {
    fetch(`${API.main}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((result) => {
        setClassListData(result.message);
        console.log(result);
      });
  }, []);

  const { newProductOrder, salesOrder, upcomingClasses } = classListData;

  return (
    <div className="main">
      <Slide />
      <div className="proudct">
        <p className="classTitle">😯마감임박순😯</p>
        <div className="classContainer">
          {upcomingClasses?.map((pro) => (
            <div key={pro.id} className="class">
              <div className="imgBox">
                <img className="classImg" alt="class" src={pro.image_source} />
              </div>
              <p className="sectionTitle">{pro.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="proudct">
        <p className="classTitle">🥰인기순🥰</p>
        <div className="classContainer">
          {salesOrder?.map((pro) => (
            <div key={pro.id} className="class">
              <div className="imgBox">
                <img
                  className="classImg"
                  alt="class"
                  src={pro.image_source}
                ></img>
              </div>
              <p className="sectionTitle">{pro.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="proudct">
        <p className="classTitle">🤩최신순🤩</p>
        <div className="classContainer">
          {newProductOrder?.map((pro) => (
            <div key={pro.id} className="class">
              <div className="imgBox">
                <img
                  className="classImg"
                  alt="class"
                  src={pro.image_source}
                ></img>
              </div>
              <p className="sectionTitle">{pro.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
