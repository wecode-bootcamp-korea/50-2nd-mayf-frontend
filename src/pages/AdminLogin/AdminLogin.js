import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [adminUserInfo, setAdminUserInfo] = useState({
    admin_id: '',
    password: '',
  });

  const handleLogin = (e) => {
    e.preventDefault();

    if (adminUserInfo.admin_id && adminUserInfo.password) {
      fetch('http://10.58.52.190:8000/admins/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(adminUserInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === 'login_success') {
            localStorage.setItem('token', data.accessToken);
            navigate('/');
          } else {
            alert(data.message);
          }
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminUserInfo({ ...adminUserInfo, [name]: value });
  };

  return (
    <div className="Admin">
      <form onSubmit={handleLogin} onChange={handleChange}>
        <div>
          <span>관리자 ID : </span>
          <input className="adminUserInfo" type="admin_id" name="admin_id" />
        </div>
        <div>
          <span>비밀번호 : </span>
          <input className="adminPw" type="password" name="password" />
        </div>
        <button>로그인</button>
      </form>
    </div>
  );
};

export default AdminLogin;
