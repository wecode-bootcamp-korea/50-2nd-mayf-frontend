import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.scss';

const Chat = ({ host, hostId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [roomCreated, setRoomCreated] = useState(false);
  const [chatId, setChatId] = useState();
  const [socket, setSocket] = useState(null);
  const userRole = localStorage.getItem('role');
  useEffect(() => {
    // 소켓 연결
    const newSocket = io('http://34.64.172.211:8000', {
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

  const getChatData = () => {
    fetch(`http://34.64.172.211:8000/chat`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setChatId(data.room[data.room.length - 1].id);
      });
  };

  // 클라이언트 측 코드 수정
  useEffect(() => {
    // 채팅방이 생성되면 서버에 참가
    if (socket && roomCreated) {
      socket.emit('join room');

      // 서버로부터 메시지 수신
      socket.on('message', (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
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
      fetch(`http://34.64.172.211:8000/message/${chatId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify({ content: newMessage, chatId }),
      })
        .then((response) => response.json())
        .then((data) => {
          // 서버 응답 확인

          setMessages((prevMessages) => {
            if (data.message && data.message.content) {
              const trimmedContent = data.message.content.trim();
              if (trimmedContent !== '') {
                // 보낸 메시지를 표시하기 위한 플래그 추가
                return [
                  ...prevMessages,
                  { content: trimmedContent, isCurrentUser: true },
                ];
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
    fetch('http://34.64.172.211:8000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        userId,
        hostId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        getChatData(); // 생성된 채팅방의 chatId를 설정
        setRoomCreated(true);
      })
      .catch((error) => {
        console.error('Error creating room:', error);
      });
  };

  return userRole === 'users' ? (
    <div className="detailPageChat">
      <div className="chatHeader">
        <div className="label">문의하기</div>
        {!roomCreated && (
          <button className="chatRoomBtn" onClick={createRoom}>
            문의 시작
          </button>
        )}
      </div>
      <div className="chatMessages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isCurrentUser ? 'received' : 'sent'}`}
          >
            <span className="username">
              {message.isCurrentUser ? host : '나'}
            </span>
            {message.content}
          </div>
        ))}
      </div>

      {roomCreated && (
        <div className="chatInput">
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
  ) : (
    (window.location.href = '/')
  );
};

export default Chat;
