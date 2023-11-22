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
      fetch('http://34.64.172.211:8000/admins/login', {
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
            navigate('/admin');
          } else {
            if (data.message === 'key_error')
              alert('아이디와 비밀번호를 입력하세요');
            else if (data.message === 'login_fail')
              alert('로그인에 실패했습니다');
            else alert('비밀번호를 확인해주세요');
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
          <input className="adminUserInfo" type="text" name="admin_id" />
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
