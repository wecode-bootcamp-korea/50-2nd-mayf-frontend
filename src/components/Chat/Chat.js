// Chat.js
import React, { useState, useEffect, useRef } from 'react';
import './Chat.scss';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = useRef(null);

  useEffect(() => {
    // 로컬 서버의 WebSocket 엔드포인트에 연결
    socket.current = new WebSocket('ws://localhost:3001');

    // 서버로부터 메시지 수신
    socket.current.addEventListener('message', (event) => {
      const newMessages = [...messages, event.data];
      setMessages(newMessages);
    });

    // 클린업 함수
    return () => {
      socket.current.close();
    };
  }, [messages]);

  const sendMessage = () => {
    // 메시지 전송 코드
    if (socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(newMessage);
    }

    // 메시지 전송 후 로컬 상태 업데이트
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    // 입력 필드 초기화
    setNewMessage('');
  };

  return (
    <div className="container">
      <div className="window">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
      <div className="inputContainer">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
