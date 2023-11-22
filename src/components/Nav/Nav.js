import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryList from './components/CategoryList';
import UserSideBar from './components/UserSideBar';
import Logo from '../Nav/navImg/logo.png';
import Category from '../Nav/navImg/category.png';
import UserIcon from '../Nav/navImg/userIcon.png';
import './Nav.scss';

const Nav = () => {
  const navigate = useNavigate();
  const [credit, setCredit] = useState('');
  const [hostCredit, setHostCredit] = useState('');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
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

  const fetchData = (endpoint) => {
    fetch(`http://34.64.172.211:8000/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (endpoint === 'users') {
          setCredit(result.userGetInfoList[0].credit);
        } else if (endpoint === 'hosts') {
          setHostCredit(result.hostInfoList[0].credit);
        }
      });
  };

  useEffect(() => {
    if (role === 'users') {
      fetchData('users');
    } else if (role === 'hosts') {
      fetchData('hosts');
    }
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
        {isOpen && (
          <UserSideBar credit={role === 'users' ? credit : hostCredit} />
        )}
      </div>
    </div>
  );
};

export default Nav;
// credit={credit || 0} hostCredit={hostCredit || 0}
