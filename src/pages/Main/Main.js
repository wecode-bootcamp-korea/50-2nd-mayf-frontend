import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../../components/Carousel/Carousel';
import API from '../../config';
import Timer from './components/Timer';
import TimeIcon from './mainIcon/upcomming.png';
import BestIcon from './mainIcon/bestIcon.png';
import NewClassIcon from './mainIcon/newClass.png';
import './Main.scss';

const Main = () => {
  const [classListData, setClassListData] = useState({});
  // fetch(API.main, {
  //'/data/mainMockData.json'
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
      <div className="container">
        <div className="proudct">
          <div className="classTitle">
            <img className="mainIcon" src={TimeIcon} alt="mainIcon" />
            <div className="titleWrapper">
              <p className="subTitle">Comming Soon </p>
              <p className="summary">곧 마감되는 클래스에요! 서둘르세요!</p>
            </div>
          </div>

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
          <div className="classTitle">
            <img className="mainIcon" src={BestIcon} alt="mainIcon" />
            <div className="titleWrapper">
              <p className="subTitle">Best Class</p>
              <p className="summary">
                이번 달을 더욱 특별하게 즐기고 싶다면, 이 클래스 어때요?
              </p>
            </div>
          </div>
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
                  <p className="hostName"> 🗽 등대 : {pro.name}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="proudct">
          <div className="classTitle">
            <img className="mainIcon" src={NewClassIcon} alt="mainIcon" />
            <div className="titleWrapper">
              <p className="subTitle">New Class</p>
              <p className="summary">
                앗 이건 해야해! 새로운 클래스들을 만나보세요!
              </p>
            </div>
          </div>
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
                  <p className="hostName"> 🗽등대 : {pro.name}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
