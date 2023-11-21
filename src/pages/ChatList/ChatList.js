import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // React Router를 사용하여 채팅방 간 이동을 처리합니다.
import io from 'socket.io-client';

const socket = io('http://10.58.52.232:8000'); // 적절한 서버 주소로 변경하세요.

const ChatList = () => {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    // 서버로부터 채팅방 목록을 받아와 업데이트합니다.
    socket.on('chatRoomList', (rooms) => {
      setChatRooms(rooms);
    });

    // 컴포넌트가 언마운트될 때 소켓 연결을 끊습니다.
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>채팅방 목록</h2>
      <ul>
        {chatRooms.map((room) => (
          <li key={room.id}>
            <Link to="/my-page-event-chatroom/14">{room.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
