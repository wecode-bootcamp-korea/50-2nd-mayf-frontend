import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyPageEventHeader from '../../components/MyPageEventHeader/MyPageEventHeader';
import MyPageEventTab from '../../components/MyPageEventTab/MyPageEventTab';
import './ChatList.scss';

const ChatList = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const navigate = useNavigate();

  const getChatRooms = () => {
    fetch('http://34.64.172.211:8000/chat/host', {
      headers: {
        Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsIm5hbWUiOiLstZzrr7zsp4AiLCJlbWFpbCI6ImFsc3dsODE4NEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtMTExMS05OTk5Iiwicm9sZSI6Imhvc3RzIiwiaWF0IjoxNzAwNTQ1NjgyLCJleHAiOjE3MDEyNjU2ODJ9.8V1tTOzgJOFcCdmBiiJGtIkE298k7BsQhUbk733D3pg
        `,
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
  }, []); // 토큰이 변경될 때마다 실행

  return (
    <div className="chatList">
      <div className="container">
        <MyPageEventHeader />

        <div className="contents">
          <MyPageEventTab />
          <div className="content">
            <div className="mainLabel">채팅 내역</div>
            <div className="chats">
              {chatRooms.map((room, index) => (
                <div className="chatRooms" key={index}>
                  <div>{room.user_name}님과 채팅을 하고 있어요</div>
                  <button
                    className="enterRoom"
                    onClick={() =>
                      navigate(`/my-page-event-chatroom/${room.id}`)
                    }
                  >
                    입장하기
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
