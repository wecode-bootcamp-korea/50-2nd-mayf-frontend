import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ScheduleList from '../ScheduleList/ScheduleList';

const CalendarApp = ({ scheduleInfo }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scheduleData, setScheduleData] = useState([
    {
      class_day: '2023-11-19 00:00:00.000000',
      class_hour: 3,
      max_member: 25,
      enrolled_member: 19,
    },
    {
      class_day: '2023-11-18 04:00:00.000000',
      class_hour: 2,
      max_member: 16,
      enrolled_member: 19,
    },
    {
      class_day: '2023-12-24 19:00:00.000000',
      class_hour: 2,
      max_member: 15,
      enrolled_member: 2,
    },
    {
      class_day: '2023-12-12 00:00:00.000000',
      class_hour: 2,
      max_member: 20,
      enrolled_member: 1,
    },
    {
      class_day: '2023-12-13 00:00:00.000000',
      class_hour: 2,
      max_member: 20,
      enrolled_member: 1,
    },
  ]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(selectedDate);
  };

  // 예약이 불가능한 날짜를 비활성화
  const tileDisabled = ({ date }) => {
    const dateString = date.toISOString().split('T')[0];
    return !scheduleData.some((item) => item.class_day.includes(dateString));
  };

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileDisabled={tileDisabled}
      />
    </div>
  );
};

export default CalendarApp;
