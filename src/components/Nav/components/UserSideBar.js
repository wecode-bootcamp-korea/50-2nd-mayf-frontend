import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserSideBar.scss';

const UserSideBar = ({ credit }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const SIDE_BAR = {
    users: (
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
          <li className="menu">
            보유 크레딧 : {credit.toLocaleString('ko-KR')}
          </li>
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
    ),
    hosts: (
      <div className="evenUser">
        <ul className="eventUserMenu">
          <li
            className="menu"
            onClick={() => {
              navigate('/my-page-event');
            }}
          >
            MY PAGE
          </li>
        </ul>
      </div>
    ),
  };

  return <div className="box">{SIDE_BAR[role]}</div>;
};

export default UserSideBar;
