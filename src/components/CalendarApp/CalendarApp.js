import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarApp.scss';

const CalendarApp = ({ scheduleInfo = [], scheduleId }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  const isDateAvailable = (date) => {
    // scheduleInfo가 정의되어 있고 배열인 경우에만 some 메서드 호출
    return (
      Array.isArray(scheduleInfo) &&
      scheduleInfo.some(
        (schedule) =>
          new Date(schedule.class_day).toLocaleDateString() ===
          date.toLocaleDateString(),
      )
    );
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedClass(null);
  };

  const handleClassSelect = (classData) => {
    setSelectedClass(classData);
  };

  return (
    <div className="calendar-app">
      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={({ date }) => (isDateAvailable(date) ? '📅' : null)}
        />
      </div>
      {selectedDate && (
        <div className="scheduleList">
          <ul>
            {scheduleInfo
              .filter(
                (schedule) =>
                  new Date(schedule.class_day).toLocaleDateString() ===
                  selectedDate.toLocaleDateString(),
              )
              .map((classData, index) => (
                <li className="dateContainer" key={index}>
                  <button
                    className="dateList"
                    onClick={() => {
                      scheduleId(classData.schedule_id);
                      handleClassSelect(classData);
                    }}
                  >
                    {classData.class_day.slice(0, 16)}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
      {selectedClass && (
        <div className="scheduleData">
          <h2>강의 정보</h2>
          <p>날짜 : {selectedClass.class_day.slice(0, 11)}</p>
          <p>시간 : {selectedClass.class_day.slice(11, 16)}</p>
          <p>등록 인원 : {selectedClass.enrolled_member}</p>
          <p>최대 인원 : {selectedClass.max_member}</p>
        </div>
      )}
    </div>
  );
};

export default CalendarApp;
