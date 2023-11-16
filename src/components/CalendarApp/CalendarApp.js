// CalendarApp.js

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarApp = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scheduleData, setScheduleData] = useState([
    // 예약 가능한 스케줄 데이터
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
  ]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getAvailableSlots = () => {
    const formattedSelectedDate = selectedDate.toISOString().split('T')[0];
    const selectedDateSchedules = scheduleData.filter(
      (schedule) => schedule.class_day.split(' ')[0] === formattedSelectedDate,
    );

    const availableSlots = selectedDateSchedules.filter(
      (schedule) => schedule.max_member > schedule.enrolled_member,
    );

    return availableSlots;
  };

  const isDateDisabled = ({ date }) => {
    const formattedDate = date.toISOString().split('T')[0];
    const availableDates = scheduleData
      .filter((schedule) => schedule.max_member > schedule.enrolled_member)
      .map((schedule) => schedule.class_day.split(' ')[0]);

    return !availableDates.includes(formattedDate - 1);
  };

  const handleReservation = (slot) => {
    // 예약 처리 로직
    console.log('예약되었습니다.', slot);
  };

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileDisabled={isDateDisabled}
      />
      <h2>Available Slots</h2>
      {getAvailableSlots().length > 0 ? (
        <ul>
          {getAvailableSlots().map((slot) => (
            <li key={slot.class_day}>
              {slot.class_day} - {slot.class_duration}시간
              <button onClick={() => handleReservation(slot)}>예약하기</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>해당 날짜에는 예약 가능한 시간이 없습니다.</p>
      )}
    </div>
  );
};

export default CalendarApp;
