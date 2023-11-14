import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarApp = ({ onReserve }) => {
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const allowedTimesByDate = {
    '2023-01-01': ['10:00', '14:00'],
    '2023-01-05': ['15:00'],
    '2023-01-10': ['9:00'],
  };

  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toISOString().split('T')[0];
      const isAllowedDate = formattedDate in allowedTimesByDate;
      return !isAllowedDate;
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toISOString().split('T')[0];
      const isAllowedDate = formattedDate in allowedTimesByDate;
      return isAllowedDate ? (
        <div
          style={{
            background: 'green',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
          }}
        />
      ) : null;
    }
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const getAvailableTimes = () => {
    const formattedDate = date.toISOString().split('T')[0];
    return allowedTimesByDate[formattedDate] || [];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const availableTimes = getAvailableTimes();
    if (availableTimes.length > 0 && availableTimes.includes(selectedTime)) {
      onReserve({ date, time: selectedTime });
      setSelectedTime(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        날짜:
        <Calendar
          onChange={setDate}
          value={date}
          tileDisabled={tileDisabled}
          tileContent={tileContent}
          view="month"
        />
      </label>
      <div>
        <p>예약 가능한 시간:</p>
        {getAvailableTimes().map((time, index) => (
          <button
            key={index}
            onClick={() => handleTimeClick(time)}
            disabled={selectedTime === time}
          >
            {time}
          </button>
        ))}
      </div>
      <button type="submit">예약</button>
    </form>
  );
};

export default CalendarApp;
