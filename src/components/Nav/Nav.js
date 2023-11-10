import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Logo from '../Nav/navImg/logo.png';
import Category from '../Nav/navImg/category.png';
import UserIcon from '../Nav/navImg/user.png';
import './Nav.scss';

//categoryLogo = 전체 카테고리 표시
//로그인시 하나의 아이콘으로 표시
//클릭시 useOutsideClick

const Nav = () => {
  const navigate = useNavigate();
  //login여부 확인 state, 나중에는 토큰 불러올 예정
  const [login, setLogin] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="nav">
      <div className="categoryLogo">
        <img className="category" src={Category} alt="categoryIcon" />
        <img
          className="logo"
          onClick={() => {
            navigate('/');
          }}
          src={Logo}
          alt="logo"
        />
      </div>
      <div className="loginLogo">
        {/* <img className="user" src={UserIcon} onClick={toggleSidebar} /> */}
        {login ? (
          <div>
            <img
              onClick={() => toggleSidebar()}
              className="user"
              src={UserIcon}
            />
          </div>
        ) : (
          <p className="login"> 로그인 </p>
        )}
        {isOpen ? <Sidebar /> : null}
      </div>
    </div>
  );
};

export default Nav;
