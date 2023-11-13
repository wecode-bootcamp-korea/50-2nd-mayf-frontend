import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({
    admin_id: '',
    password: '',
  });
  const handleLogin = () => {
    fetch('http://10.58.52.190:8000/admins/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(admin),
    })
      .then((res) => res.json())
      .then((data) => {
        if ((data.message = 'login_success')) {
          localStorage.setItem('token', data.accessToken);
          navigate('/');
        } else {
          alert('error');
        }
      });
  };
  return (
    <div className="Admin">
      <div>
        <span>관리자 ID : </span>
        <input
          className="adminId"
          type="email"
          onChange={(e) => setAdmin({ ...admin, admin_id: e.target.value })}
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
