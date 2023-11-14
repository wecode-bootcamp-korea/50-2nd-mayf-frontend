import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './Timer.scss';

const Timer = ({ endDate }) => {
  const [remainingTime, setRemainingTime] = useState(0);
  //setInterval 함수로 1초마다 실행되는 타이머 설정
  useEffect(() => {
    const intervalId = setInterval(() => {
      const formatDate = moment(endDate);
      const today = moment();
      // 현재와 class종료 시간 차이를 초로 변환
      const timeGap = moment.duration(formatDate.diff(today)).asSeconds();
      //소수점 반올림하여 정수로 변환
      const updatedRemainingTime = Math.ceil(timeGap);

      if (updatedRemainingTime >= 0) {
        setRemainingTime(updatedRemainingTime);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    // 컴포넌트가 언마운트되면 타이머 정리
    return () => clearInterval(intervalId);
  }, [endDate]);
  //moment.unix 사용하여 초를 날짜 및 시간으로 변환,  내가 원하는 형식으로 포맷
  const formattedTime = moment.unix(remainingTime).format('DD일 hh:mm:ss 남음');

  return (
    <>
      <p className="countTime">{formattedTime}</p>
    </>
  );
};

export default Timer;
