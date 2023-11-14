// import React, { useState, useEffect } from 'react';

// const CountdownTimer = ({ deadline }) => {
//   const [secondsRemaining, setSecondsRemaining] = useState(
//     calculateTimeRemaining(),
//   );

//   useEffect(() => {
//     //setTitmeout;
//     const timerInterval = setInterval(() => {
//       setSecondsRemaining(calculateTimeRemaining());
//     }, 1000);

//     // 컴포넌트가 언마운트되면 타이머 클리어
//     return () => clearInterval(timerInterval);
//   }, [deadline]);

//   function calculateTimeRemaining() {
//     if (deadline) {
//       const now = new Date();
//       const deadlineDate = new Date(deadline);
//       const timeDiff = deadlineDate - now;
//       return Math.max(Math.floor(timeDiff / 1000), 0);
//     }
//     return 0;
//   }

//   return <>{secondsRemaining}</>;
// };

// export default CountdownTimer;

// function remaindTime() {
//   var now = new Date(); //현재시간을 구한다.
//   var open = new Date(2021, 02, 11, 11, 00, 00);

//   var nt = now.getTime(); // 현재의 시간만 가져온다
//   var ot = open.getTime(); // 오픈시간만 가져온다

//   if (nt < ot) {
//     //현재시간이 오픈시간보다 이르면 오픈시간까지의 남은 시간을 구한다.
//     sec = parseInt(ot - nt) / 1000;
//     hour = parseInt(sec / 60 / 60);
//     sec = sec - hour * 60 * 60;
//     min = parseInt(sec / 60);
//     sec = parseInt(sec - min * 60);

//     if (hour < 10) {
//       hour = '0' + hour;
//     }
//     if (min < 10) {
//       min = '0' + min;
//     }
//     if (sec < 10) {
//       sec = '0' + sec;
//     }
//     $('#d-day-hour').html(hour);
//     $('#d-day-min').html(min);
//     $('#d-day-sec').html(sec);
//   } else {
//     //현재시간이 종료시간보다 크면
//     $('#d-day-hour').html('00');
//     $('#d-day-min').html('00');
//     $('#d-day-sec').html('00');
//   }
// }
// setInterval(remaindTime, 1000); //1초마다 검사를 해주면 실시간으로 시간을 알 수 있다.
