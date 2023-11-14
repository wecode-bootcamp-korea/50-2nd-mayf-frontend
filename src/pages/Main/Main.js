import React, { useState, useEffect } from 'react';
//import Timer from './components/Timer';
import Slide from './components/Slide';
import API from '../../config';
import './Main.scss';

const Main = () => {
  const [classListData, setClassListData] = useState({});
  const [count, setCount] = useState([]);

  // 초단위까지 구할거면 ml
  // 변환의 변환의 연속
  // const date = new Date();
  // const time = date - count;
  // //const countTime = count.length > 0 ? count[0] - date : NaN;
  // console.log(time);
  // // time변수의 값이 0보다 크면 setTimeout함수를 통해 time의 값을 1초(1000)마다 1씩 감소
  // useEffect(() => {
  //   count > 0 && setTimeout(() => setCount(count - 1), 1000);
  // }, [count]);
  // 두 날짜 사이를 비교해서 날짜계산해서 시분초로 숫자변환한다음에
  // setInterval로 몇초마다 깎이게 하는거니깐
  useEffect(() => {
    fetch(`${API.main}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((result) => {
        setClassListData(result.message);
        const classDays = result.message.upcomingClasses.map(
          (pro) => pro.class_day,
        );
        setCount(classDays);
        console.log(count);
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
              <p className="countDown">{pro.class_day}</p>
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
