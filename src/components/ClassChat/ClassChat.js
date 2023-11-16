// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const socket = io.connect('http://localhost:4000');

// function ClassChat() {
//   const [chat, setChat] = useState([]);
//   const [message, setMessage] = useState('');

//   const sendMessage = () => {
//     socket.emit('message', message);
//     setMessage('');
//   };

//   useEffect(() => {
//     socket.on('message', (message) => {
//       setChat([...chat, message]);
//     });
//   }, [chat]);
//   return (
//     <div>
//       <div>
//         <h1>Message</h1>
//         <ul>
//           {chat.map((data, idx) => {
//             return <li key={idx}>{data}</li>;
//           })}
//         </ul>
//       </div>

//       <div>
//         <h1>Chat Box</h1>
//         <input value={message} onChange={(e) => setMessage(e.target.value)} />
//         <button onClick={sendMessage}>Send Message</button>
//       </div>
//     </div>
//   );
// }

// export default ClassChat;
