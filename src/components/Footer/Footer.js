import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const watched = localStorage.getItem('watched');
  const logout = () => {
    localStorage.clear('token', 'role', 'watched');

    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  return (
    <div className="footer">
      <div className="developer">
        <a
          href="https://github.com/wecode-bootcamp-korea/50-3rd-mayfly-frontend"
          className="gitHubUrl"
        >
          FrontEnd
        </a>
        <ul className="member">
          <li>최민지</li>
          <li>신희현</li>
          <li>임시현</li>
        </ul>
      </div>
      <div className="developer">
        <a
          href="https://github.com/wecode-bootcamp-korea/50-3rd-mayfly-backend"
          className="gitHubUrl"
        >
          BackEnd
        </a>
        <ul className="member">
          <li>유진서</li>
          <li>김문영</li>
          <li>노범석</li>
          <li>이주현</li>
        </ul>
      </div>
      {token && role ? (
        <p className="logout" onClick={logout}>
          로그아웃
        </p>
      ) : (
        <p className="logout">Mayfly</p>
      )}
    </div>
  );
};

export default Footer;
