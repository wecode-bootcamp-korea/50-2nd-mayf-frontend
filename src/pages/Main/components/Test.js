// const createCountdown = (classDay) => {
//   // 클래스 날짜를 JavaScript Date 객체로 변환
//   const classDate = new Date(classDay);

//   // 현재 날짜를 얻기
//   const now = new Date();

//   // 클래스 시작까지 남은 시간 계산 (밀리초 단위)
//   const timeDifference = classDate.getTime() - now.getTime();

//   // 남은 일, 시간, 분, 초 계산
//   const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//   const hours = Math.floor(
//     (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
//   );
//   const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

//   // 카운트다운 정보 반환
//   return {
//     days,
//     hours,
//     minutes,
//     seconds,
//   };
// };

// // 사용 예시
// const classDay = '2023-12-10T15:00:00.000Z';
// const countdown = createCountdown(classDay);

// console.log(countdown);
