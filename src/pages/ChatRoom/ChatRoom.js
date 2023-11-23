import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useNavigate, useParams } from 'react-router-dom';
import './ChatRoom.scss';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [roomCreated, setRoomCreated] = useState(true);
  const [chatData, setChatData] = useState([]);
  const [socket, setSocket] = useState(null);
  const { chatId } = useParams();
  const navigate = useNavigate();

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

  // 클라이언트 측 코드 수정
  useEffect(() => {
    // 채팅방이 생성되면 서버에 참가
    if (socket) {
      socket.emit('join room');

      // 서버로부터 메시지 수신
      // 채팅 메시지 전송 시
      // 클라이언트 측 코드
      socket.on('message', (msg) => {
        console.log('Received message:', msg);

        // 메시지의 송신자가 현재 사용자인지를 판별하여 isCurrentUser 설정
        // const isCurrentUser = msg.userId === socket.id;

        // 메시지 객체에 isCurrentUser 추가
        const messageWithUser = { ...msg, isCurrentUser: msg.isCurrentUser };
        setMessages((prevMessages) => [...prevMessages, messageWithUser]);
      });

      // 서버로부터 저장된 메시지 수신
      socket.on('load messages', (loadedMessages) => {
        setMessages(loadedMessages);
      });
    }
  }, [socket, roomCreated]);

  useEffect(() => {
    fetch(`http://34.64.172.211:8000/chat/host/${chatId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsIm5hbWUiOiLstZzrr7zsp4AiLCJlbWFpbCI6ImFsc3dsODE4NEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtMTExMS05OTk5Iiwicm9sZSI6Imhvc3RzIiwiaWF0IjoxNzAwNTQ1NjgyLCJleHAiOjE3MDEyNjU2ODJ9.8V1tTOzgJOFcCdmBiiJGtIkE298k7BsQhUbk733D3pg',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setChatData(data.room[0]);
      });
  }, []);

  // 메시지 전송
  // 메시지 전송 시
  const handleSendMessage = () => {
    if (socket) {
      // socket이 null이 아닌 경우에만 실행
      socket.emit('message', {
        content: newMessage,
        isCurrentUser: true, // 보낸 메시지를 표시하기 위한 플래그
      });

      // 기존의 fetch를 사용하여 메시지 저장
      fetch(`http://34.64.172.211:8000/message/${chatId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsIm5hbWUiOiLstZzrr7zsp4AiLCJlbWFpbCI6ImFsc3dsODE4NEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtNTcwNC04NDg0Iiwicm9sZSI6InVzZXJzIiwiaWF0IjoxNzAwNTYzNjY5LCJleHAiOjE3MDEyODM2Njl9.Ibm3Hpn3HvqZZJMnWl3FX04vaKwf0zfS1JCModJr51E',
        },
        body: JSON.stringify({ content: newMessage, chatId }),
      })
        .then((response) => response.json())
        .then((data) => {
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

  return (
    <div className="myPageChat">
      <div className="chatHeader">
        <button onClick={() => navigate('/my-page-event-chatlist')}>
          뒤로 가기
        </button>
      </div>
      <div className="chatMessages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isCurrentUser ? 'sent' : 'received'}`}
          >
            <span className="username">
              {message.isCurrentUser ? '나' : chatData.user_name}
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
  );
};

export default ChatRoom;
