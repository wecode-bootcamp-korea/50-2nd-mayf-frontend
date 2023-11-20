import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const watched = localStorage.getItem('watched');
  const logout = () => {
    localStorage.removeItem('token', 'role', 'watched');
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  return (
    <div className="footer">
      {(token && role) || watched ? (
        <p className="logout" onClick={logout}>
          로그아웃
        </p>
      ) : (
        <p />
      )}
    </div>
  );
};

export default Footer;
