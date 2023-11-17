import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../../components/Carousel/Carousel';
import API from '../../config';
import Timer from './components/Timer';
import './Main.scss';

const Main = () => {
  const [classListData, setClassListData] = useState({});

  useEffect(() => {
    fetch(API.main, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((result) => {
        setClassListData(result.message);
      });
  }, []);

  const { newProductOrder, salesOrder, upcomingClasses } = classListData;

  return (
    <div className="main">
      <Carousel />
      <div className="proudct">
        <p className="classTitle">😯마감임박순😯</p>
        <div className="classContainer">
          {upcomingClasses?.map((pro) => (
            <div key={pro.id} className="class">
              <Link to={`/detail/${pro.id}`} className="detailLink">
                <div className="imgBox">
                  <img
                    className="classImg"
                    alt="class"
                    src={pro.image_source}
                  />
                </div>
                <p className="sectionTitle">{pro.title}</p>
              </Link>
              <Timer endDate={pro.class_day} />
            </div>
          ))}
        </div>
      </div>
      <div className="proudct">
        <p className="classTitle">🥰인기순🥰</p>
        <div className="classContainer">
          {salesOrder?.map((pro) => (
            <div key={pro.id} className="class">
              <Link to={`/detail/${pro.id}`} className="detailLink">
                <div className="imgBox">
                  <img
                    className="classImg"
                    alt="class"
                    src={pro.image_source}
                  />
                </div>
                <p className="sectionTitle">{pro.title}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="proudct">
        <p className="classTitle">🤩최신순🤩</p>
        <div className="classContainer">
          {newProductOrder?.map((pro) => (
            <div key={pro.id} className="class">
              <Link to={`/detail/${pro.id}`} className="detailLink">
                <div className="imgBox">
                  <img
                    className="classImg"
                    alt="class"
                    src={pro.image_source}
                  />
                </div>
                <p className="sectionTitle">{pro.title}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
