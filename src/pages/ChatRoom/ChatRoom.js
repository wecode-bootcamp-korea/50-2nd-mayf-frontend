// ChatRoom.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
// 적절한 서버 주소로 변경하세요.

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [roomCreated, setRoomCreated] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // 소켓 연결
    const newSocket = io('http://10.58.52.232:8000', {
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      console.log('Socket connected');
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    setSocket(newSocket);

    // 연결 해제 시 정리
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // 클라이언트 측 코드 수정
  useEffect(() => {
    // 채팅방이 생성되면 서버에 참가
    if (socket && roomCreated) {
      socket.emit('join room');

      // 서버로부터 메시지 수신
      socket.on('message', (msg) => {
        console.log('Received message:', msg);
        setMessages((prevMessages) => [...prevMessages, msg]);
        console.log(messages);
      });

      // 서버로부터 저장된 메시지 수신
      socket.on('load messages', (loadedMessages) => {
        setMessages(loadedMessages);
      });
    }
  }, [socket, roomCreated]);

  // 메시지 전송
  const handleSendMessage = () => {
    if (socket) {
      // socket이 null이 아닌 경우에만 실행
      socket.emit('message', {
        content: newMessage,
      });

      // 기존의 fetch를 사용하여 메시지 저장
      fetch(`http://10.58.52.232:8000/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsIm5hbWUiOiLquYDrrLjsmIEiLCJlbWFpbCI6Im1uNTJpbEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtMTIzNC01NTU1Iiwicm9sZSI6InVzZXJzIiwiaWF0IjoxNzAwMTk2NDMwLCJleHAiOjE3MDA5MTY0MzB9.WVYdWKjcFjLTyFQdPEKhLsy-XcmUa1B-cNfEcr1WOeI',
        },
        body: JSON.stringify({ content: newMessage, chatId: 14 }),
      })
        .then((response) => response.json())
        .then((data) => {
          setMessages((prevMessages) => {
            if (data.message && data.message.content) {
              const trimmedContent = data.message.content.trim();
              if (trimmedContent !== '') {
                return [...prevMessages, { content: trimmedContent }];
              }
            }
            return prevMessages;
          });
          setNewMessage('');
        })
        .catch((error) => {
          console.error('Error sending message:', error);
        });
    }
  };

  // 방 생성 API 호출
  const createRoom = () => {
    fetch('http://10.58.52.232:8000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsIm5hbWUiOiLquYDrrLjsmIEiLCJlbWFpbCI6Im1uNTJpbEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtMTIzNC01NTU1Iiwicm9sZSI6InVzZXJzIiwiaWF0IjoxNzAwMTk2NDMwLCJleHAiOjE3MDA5MTY0MzB9.WVYdWKjcFjLTyFQdPEKhLsy-XcmUa1B-cNfEcr1WOeI',
      },
      body: JSON.stringify({
        userId: 10,
        hostId: 29,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setChatId(data.chatId); // 생성된 채팅방의 chatId를 설정
        setRoomCreated(true);
      })
      .catch((error) => {
        console.error('Error creating room:', error);
      });
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <div>실시간 채팅</div>
        {!roomCreated && <button onClick={createRoom}>방 생성하기</button>}
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isCurrentUser ? 'sent' : 'received'}`}
          >
            <span className="username">
              {message.isCurrentUser ? '나' : '김문영'}
            </span>
            {message.content}
          </div>
        ))}
      </div>

      {roomCreated && (
        <div className="chat-input">
          <input
            type="text"
            placeholder="메시지를 입력하세요"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>전송</button>
        </div>
      )}
    </div>
  );
};
export default ChatRoom;
