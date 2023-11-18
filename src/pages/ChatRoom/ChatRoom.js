// // Chat.js
// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:3001');

// const Chat = () => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [userId, setUserId] = useState('');
//   const [hostId, setHostId] = useState('');
//   const [userToken, setUserToken] = useState('');

//   useEffect(() => {
//     // 서버로부터 메시지 수신
//     socket.on('chat message', (msg) => {
//       setMessages([...messages, msg]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [messages]);

//   useEffect(() => {
//     fetch(`http://10.58.52.238:8000/users`, {
//       headers: {
//         Authorization:
//           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsIm5hbWUiOiLstZzrr7zsp4AiLCJlbWFpbCI6ImFsc3dsODE4NEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtNTcwNC04NDg0Iiwicm9sZSI6Imhvc3RzIiwiaWF0IjoxNzAwMTk2MjQ4LCJleHAiOjE3MDA5MTYyNDh9.djPth_b9BC8H8dNNpr3R0LnuUbC9pQ3oeYlihvzUwyA',
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setUserId(data.message);
//       });
//   });

//   const sendMessage = () => {
//     // 서버로 메시지 전송
//     socket.emit('chat message', message);
//     setMessage('');
//   };

//   const startChat = () => {
//     // fetch를 사용한 POST 요청 보내기
//     fetch('http://10.58.52.238:8000/chat', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${userToken}`,
//       },
//       body: JSON.stringify({
//         userId,
//         hostId,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('Chat started:', data);
//       })
//       .catch((error) => {
//         console.error('Error starting chat:', error);
//       });
//   };

//   return (
//     <div>
//       <ul>
//         {messages.map((msg, index) => (
//           <li key={index}>{msg}</li>
//         ))}
//       </ul>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button onClick={sendMessage}>Send</button>

//       {/* 추가: 채팅 시작 버튼 */}
//       <input
//         type="text"
//         placeholder="User ID"
//         value={userId}
//         onChange={(e) => setUserId(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Host ID"
//         value={hostId}
//         onChange={(e) => setHostId(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="User Token"
//         value={userToken}
//         onChange={(e) => setUserToken(e.target.value)}
//       />
//       <button onClick={startChat}>Start Chat</button>
//     </div>
//   );
// };

// export default Chat;
