import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryList from './components/CategoryList';
import UserSideBar from './components/UserSideBar';
import Logo from '../Nav/navImg/logo.png';
import Category from '../Nav/navImg/category.png';
import UserIcon from '../Nav/navImg/user.png';
import './Nav.scss';

const Nav = () => {
  const navigate = useNavigate();
  const [credit, setCredit] = useState();
  const token = localStorage.getItem('token');
  //유저 아이콘 클릭시 컴포넌트 실행 사이드바 구현
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  //햄버거 버튼 카테고리 구현
  const [showCategories, setShowCategories] = useState(true);
  const handleLogoClick = () => {
    setShowCategories(!showCategories);
  };

  //문영님, 보유 크레딧 정보 불러오기
  useEffect(() => {
    fetch('http://10.58.52.102:8000/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setCredit(result.userGetInfoList[0].credit);
      });
  }, []);

  return (
    <div className="nav">
      <div className="categoryLogo">
        <img
          className="category"
          src={Category}
          alt="categoryIcon"
          onClick={handleLogoClick}
        />
        {showCategories && <CategoryList />}
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
        {token ? (
          <img
            onClick={toggleSidebar}
            className="user"
            src={UserIcon}
            alt="userIcon"
          />
        ) : (
          <p
            className="login"
            onClick={() => {
              navigate('/login');
            }}
          >
            로그인
          </p>
        )}
        {isOpen && <UserSideBar credit={credit} />}
      </div>
    </div>
  );
};

export default Nav;
