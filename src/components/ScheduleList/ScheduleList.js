import React from 'react';

const ScheduleList = ({ scheduleItems, selectedDate, handleTimeSlotClick }) => {
  const filteredSchedule = scheduleItems.filter((item) => {
    const itemDate = new Date(item.class_day);
    return itemDate.toDateString() === selectedDate.toDateString();
  });

  const getAvailableTimeSlots = () => {
    const availableTimeSlots = [];
    filteredSchedule.forEach((item) => {
      const availableTime = item.class_hour - item.enrolled_member;
      availableTimeSlots.push(availableTime);
    });
    return availableTimeSlots;
  };

  const availableTimeSlots = getAvailableTimeSlots();

  return (
    <div>
      <h3>Schedule for {selectedDate.toDateString()}</h3>
      {filteredSchedule.length > 0 ? (
        <ul>
          {filteredSchedule.map((item, index) => (
            <li key={index}>
              <p>Date: {item.class_day}</p>
              <p>Time: {item.class_hour} hours</p>
              <p>Max Members: {item.max_member}</p>
              <p>Enrolled Members: {item.enrolled_member}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No schedule for this date.</p>
      )}
      <h3>Available Time Slots</h3>
      {availableTimeSlots.length > 0 ? (
        <div>
          {availableTimeSlots.map((time, index) => (
            <button key={index} onClick={() => handleTimeSlotClick(time)}>
              {time} hours
            </button>
          ))}
        </div>
      ) : (
        <p>No available time slots for this date.</p>
      )}
    </div>
  );
};

export default ScheduleList;
