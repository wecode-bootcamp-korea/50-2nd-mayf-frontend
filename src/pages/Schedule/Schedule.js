// Schedule.js
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Schedule.scss';
import { useParams } from 'react-router-dom';

const Schedule = () => {
  const { classId } = useParams();
  const [scheduleData, setScheduleData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedMaxMember, setSelectedMaxMember] = useState(0);
  const [plusSchedule, setPlusScehdule] = useState([]);

  const loadSchedule = () => {
    fetch(`http://34.64.172.211:8000/schedules/${classId}`, {
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsIm5hbWUiOiLstZzrr7zsp4AiLCJlbWFpbCI6ImFsc3dsODE4NEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtMTExMS05OTk5Iiwicm9sZSI6Imhvc3RzIiwiaWF0IjoxNzAwNTQ1NjgyLCJleHAiOjE3MDEyNjU2ODJ9.8V1tTOzgJOFcCdmBiiJGtIkE298k7BsQhUbk733D3pg',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setScheduleData(data.result);
      });
  };

  useEffect(() => {
    loadSchedule();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleMaxMemberChange = (e) => {
    setSelectedMaxMember(e.target.value);
  };

  const calculateEndTime = (startTime, duration) => {
    const startDateTime = new Date(startTime);
    const endDateTime = new Date(
      startDateTime.getTime() + duration * 60 * 60 * 1000,
    );
    return endDateTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const addSchedule = () => {
    if (selectedDate && selectedTime && selectedMaxMember !== null) {
      const formattedDate = new Date(selectedDate);
      const formattedTime = `${selectedTime}:00:00`;
      const newSchedule = {
        classDay: `${formattedDate.getFullYear()}-${
          formattedDate.getMonth() + 1
        }-${formattedDate.getDate()} ${formattedTime}`,
        classHour: 2,
        maxMember: Number(selectedMaxMember),
      };

      setPlusScehdule([...plusSchedule, newSchedule]);
      setSelectedDate(null);
      setSelectedTime(null);
      setSelectedMaxMember(0);
    }
  };

  const updateSchedule = () => {
    if (
      selectedIndex !== null &&
      selectedDate &&
      selectedTime &&
      selectedMaxMember !== null
    ) {
      const hasEnrolledStudents =
        scheduleData[selectedIndex].enrolledMember > 0;

      if (hasEnrolledStudents) {
        alert('수강생이 등록된 강의는 수정할 수 없습니다.');
        return; // 수정 불가능한 경우 함수 종료
      }

      const updatedSchedule = {
        classDay: `${selectedDate.getFullYear()}-${
          selectedDate.getMonth() + 1
        }-${selectedDate.getDate()} ${selectedTime}:00:00.000000`,
        classHour: '2',
        maxMember: selectedMaxMember,
        enrolledMember: 0,
      };

      const updatedData = [...scheduleData];
      updatedData[selectedIndex] = updatedSchedule;
      setScheduleData(updatedData);

      // 백엔드에 수정 요청 보내기
      fetch(
        `http://34.64.172.211:8000/schedules/${scheduleData[selectedIndex].id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsIm5hbWUiOiLstZzrr7zsp4AiLCJlbWFpbCI6ImFsc3dsODE4NEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtMTExMS05OTk5Iiwicm9sZSI6Imhvc3RzIiwiaWF0IjoxNzAwNTQ1NjgyLCJleHAiOjE3MDEyNjU2ODJ9.8V1tTOzgJOFcCdmBiiJGtIkE298k7BsQhUbk733D3pg',
          },
          body: JSON.stringify(updatedSchedule),
        },
      )
        .then((response) => response.json())
        .then((data) => {
          if (Object.keys(data.result).includes('error')) {
            alert('시간이 겹칩니다.');
            loadSchedule();
          } else if (data.result.message === 'UPDATE_SCHEDULE_SUCCESS') {
            alert('수정 완료되었습니다.');
            loadSchedule();
          }
        });

      setSelectedIndex(null);
      setSelectedDate(null);
      setSelectedTime(null);
      setSelectedMaxMember(0);
    }
  };

  const deleteSchedule = (index) => {
    const hasEnrolledStudents = scheduleData[index].enrolledMember > 0;

    if (hasEnrolledStudents) {
      alert('수강생이 등록된 강의는 삭제할 수 없습니다.');
    } else {
      // 백엔드에 삭제 요청 보내기
      fetch(`http://34.64.172.211:8000/schedules/${scheduleData[index].id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsIm5hbWUiOiLstZzrr7zsp4AiLCJlbWFpbCI6ImFsc3dsODE4NEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtMTExMS05OTk5Iiwicm9sZSI6Imhvc3RzIiwiaWF0IjoxNzAwNTQ1NjgyLCJleHAiOjE3MDEyNjU2ODJ9.8V1tTOzgJOFcCdmBiiJGtIkE298k7BsQhUbk733D3pg',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('삭제 실패');
          }
          return response.json();
        })
        .then((data) => {
          if (data.result.message === 'DELETE_SCHEDULE_SUCCESS') {
            alert('삭제되었습니다.');
            loadSchedule();
          }
        })
        .catch((error) => {
          console.error('Error deleting schedule:', error);
          // 실패했을 때의 처리 (예: 사용자에게 알림 등)
        });
    }
  };

  const handleUpdateClick = (index, schedule) => {
    if (schedule.enrolledMember === 0) {
      setSelectedIndex(index);
      setSelectedDate(new Date(schedule.classDay));
      const hour = new Date(schedule.classDay).getHours();
      setSelectedTime(hour);
      setSelectedMaxMember(schedule.maxMember);
    } else {
      alert('수강생이 등록된 강의는 수정할 수 없습니다.');
    }
  };

  const tileContent = ({ date, view }) => {
    if (!date || view !== 'month') {
      return null;
    }

    const formattedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    const hasSchedule = scheduleData.some(
      (schedule) =>
        schedule.classDay && schedule.classDay.startsWith(formattedDate),
    );

    return hasSchedule ? <div className="schedule-marker" /> : null;
  };

  const completEdit = () => {
    fetch(`http://34.64.172.211:8000/schedules/${classId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsIm5hbWUiOiLstZzrr7zsp4AiLCJlbWFpbCI6ImFsc3dsODE4NEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtMTExMS05OTk5Iiwicm9sZSI6Imhvc3RzIiwiaWF0IjoxNzAwNTQ1NjgyLCJleHAiOjE3MDEyNjU2ODJ9.8V1tTOzgJOFcCdmBiiJGtIkE298k7BsQhUbk733D3pg',
      },
      body: JSON.stringify({
        schedule_info: plusSchedule,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result.errors.length > 0) {
          alert('중복된 스케줄이 있습니다.\n지금 있는 스케줄을 확인해주세요.');
          setPlusScehdule([]);
          loadSchedule();
        } else {
          alert('스케줄이 추가되었습니다.');
          setPlusScehdule([]);
          loadSchedule();
        }
      });
  };

  return (
    <div className="calendarContainer">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileContent={tileContent}
      />
      <div>
        <h2>강의 일정</h2>
        <div>
          <label>시간 선택: </label>
          {[9, 11, 13, 15, 17, 19].map((time) => (
            <button key={time} onClick={() => handleTimeSelect(time)}>
              {time}:00
            </button>
          ))}
        </div>
        {selectedDate && selectedTime && (
          <p>
            선택된 날짜 및 시간: {selectedDate.toDateString()} {selectedTime}
            :00 -{' '}
            {calculateEndTime(
              `${selectedDate.toDateString()} ${selectedTime}:00:00.000000`,
              2,
            )}
            에 끝남
          </p>
        )}
        <label>
          최대 수강 인원:
          <input
            type="number"
            value={selectedMaxMember}
            onChange={handleMaxMemberChange}
          />
        </label>
        <ul className="schedule-list">
          {scheduleData
            .filter((schedule) => schedule.status === 1)
            .map((schedule, index) => (
              <li key={index}>
                {schedule.classDay} -{' '}
                {calculateEndTime(schedule.classDay, schedule.classHour)} (최대
                수강 인원: {schedule.maxMember}, 등록된 수강 인원:{' '}
                {schedule.enrolledMember})
                <button onClick={() => handleUpdateClick(index, schedule)}>
                  수정
                </button>
                <button onClick={() => deleteSchedule(index)}>삭제</button>
              </li>
            ))}
        </ul>

        <ul className="plusSchedule">
          {plusSchedule.map((schedule, index) => (
            <li key={index}>
              {schedule.classDay.slice(0, 16)} -{' '}
              {calculateEndTime(schedule.classDay, schedule.classHour)} (최대
              수강 인원: {schedule.maxMember}, 등록된 수강 인원:{' '}
              {schedule.enrolledMember})
              <button onClick={() => handleUpdateClick(index, schedule)}>
                수정
              </button>
              <button onClick={() => deleteSchedule(index)}>삭제</button>
            </li>
          ))}
          <button onClick={addSchedule}>일정 추가</button>
        </ul>

        <ul className="schedule-list">
          지난 강의들
          {scheduleData
            .filter((schedule) => schedule.status === 0)
            .map((schedule, index) => (
              <li key={index}>
                {schedule.classDay} -{' '}
                {calculateEndTime(schedule.classDay, schedule.classHour)} (최대
                수강 인원: {schedule.maxMember}, 등록된 수강 인원:{' '}
                {schedule.enrolledMember})
              </li>
            ))}
        </ul>
        {selectedIndex !== null && (
          <button onClick={updateSchedule}>수정 내용 저장</button>
        )}
      </div>
      <button onClick={completEdit}>수정 완료</button>
    </div>
  );
};

export default Schedule;
