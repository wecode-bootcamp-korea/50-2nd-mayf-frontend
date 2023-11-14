import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sideBar">
      <ul className="userMenu">
        <li
          className="menu"
          onClick={() => {
            navigate('/my-page-user');
          }}
        >
          MY PAGE
        </li>
        <li className="menu">보유 크레딧</li>
        <li
          className="menu"
          onClick={() => {
            navigate('/credit');
          }}
        >
          충전하기
        </li>
        <li className="menu">WISH LIST</li>
      </ul>
    </div>
  );
};

export default Sidebar;
