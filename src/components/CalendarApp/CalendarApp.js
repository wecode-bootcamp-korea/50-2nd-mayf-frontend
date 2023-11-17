import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarApp = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  const scheduleData = [
    {
      class_day: '2023-12-24 19:00:00.000000',
      class_duration: '2',
      max_member: 15,
      enrolled_member: 2,
    },
    {
      class_day: '2023-12-12 13:00:00.000000',
      class_duration: '2',
      max_member: 20,
      enrolled_member: 1,
    },
    {
      class_day: '2023-12-13 15:00:00.000000',
      class_duration: '2',
      max_member: 20,
      enrolled_member: 1,
    },
    {
      class_day: '2023-11-30 11:00:00.000000',
      class_duration: '2',
      max_member: 20,
      enrolled_member: 15,
    },
    {
      class_day: '2023-11-30 13:00:00.000000',
      class_duration: '2',
      max_member: 25,
      enrolled_member: 20,
    },
    {
      class_day: '2023-11-30 15:00:00.000000',
      class_duration: '2',
      max_member: 15,
      enrolled_member: 10,
    },
  ];

  const isDateAvailable = (date) => {
    // 해당 날짜에 예약 가능한 스케줄이 있는지 확인
    return scheduleData.some(
      (schedule) =>
        new Date(schedule.class_day).toLocaleDateString() ===
        date.toLocaleDateString(),
    );
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedClass(null);
  };

  const handleClassSelect = (classData) => {
    setSelectedClass(classData);
  };

  const handleReservation = () => {
    if (selectedClass) {
      console.log('예약 완료:', selectedClass);
    } else {
      console.log('강의를 선택해주세요.');
    }
  };

  return (
    <div className="calendar-app">
      <h1>강의 예약 시스템</h1>
      <div className="calendar-container">
        <h2>달력</h2>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={({ date }) => (isDateAvailable(date) ? '📅' : null)}
        />
      </div>
      {selectedDate && (
        <div>
          <h2>예약 가능한 강의</h2>
          <ul>
            {scheduleData
              .filter(
                (schedule) =>
                  new Date(schedule.class_day).toLocaleDateString() ===
                  selectedDate.toLocaleDateString(),
              )
              .map((classData, index) => (
                <li key={index}>
                  <span>{classData.class_day}</span>
                  <button onClick={() => handleClassSelect(classData)}>
                    예약하기
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
      {selectedClass && (
        <div>
          <h2>강의 정보</h2>
          <p>날짜: {selectedClass.class_day}</p>
          <p>소요 시간: {selectedClass.class_duration}시간</p>
          <p>등록 인원: {selectedClass.enrolled_member}</p>
          <p>최대 인원: {selectedClass.max_member}</p>
          <button onClick={handleReservation}>예약하기</button>
        </div>
      )}
    </div>
  );
};

export default CalendarApp;
