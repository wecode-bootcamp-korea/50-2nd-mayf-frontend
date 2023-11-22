import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatList.scss';

const ChatList = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [token, setToken] = useState(''); // 여기에 사용자 토큰을 저장
  const navigate = useNavigate();

  const getChatRooms = () => {
    fetch('http://34.64.172.211:8000/chat', {
      headers: {
        Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsIm5hbWUiOiLstZzrr7zsp4AiLCJlbWFpbCI6ImFsc3dsODE4NEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtMTExMS05OTk5Iiwicm9sZSI6Imhvc3RzIiwiaWF0IjoxNzAwNTQ1NjgyLCJleHAiOjE3MDEyNjU2ODJ9.8V1tTOzgJOFcCdmBiiJGtIkE298k7BsQhUbk733D3pg`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setChatRooms(data.room);
      })
      .catch((error) => {
        console.error('Error fetching chat rooms:', error);
      });
  };

  useEffect(() => {
    getChatRooms();

    // 5초마다 채팅방 목록을 다시 가져오기
    const intervalId = setInterval(getChatRooms, 5000);

    // 컴포넌트가 언마운트될 때 clearInterval을 사용하여 interval 정리
    return () => clearInterval(intervalId);
  }, [token]); // 토큰이 변경될 때마다 실행

  return (
    <div>
      <h2>Chat Rooms</h2>
      <ul>
        {chatRooms.map((room, index) => (
          <li key={index}>
            <button
              className="chatRoom"
              onClick={() => navigate(`/my-page-event-chatroom/${room.id}`)}
            >
              {room.user_name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
