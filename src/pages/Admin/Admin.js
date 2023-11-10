import React, { useState } from 'react';

const Admin = () => {
  const [admin, setAdmin] = useState({
    id: '',
    password: '',
  });
  const handleLogin = () => {
    // fetch('api address', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json;charset=utf-8',
    //   },
    //   body: JSON.stringify(admin),
    // });
    console.log(admin);
  };
  return (
    <div className="Admin">
      <div>
        <span>관리자 ID : </span>
        <input
          className="adminId"
          type="email"
          onChange={(e) => setAdmin({ ...admin, id: e.target.value })}
        />
      </div>
      <div>
        <span>비밀번호 : </span>
        <input
          className="adminPw"
          type="password"
          onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
        />
      </div>

      <button onClick={handleLogin}>로그인</button>
    </div>
  );
};

export default Admin;
