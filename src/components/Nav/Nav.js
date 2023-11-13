import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryList from './components/CategoryList';
import Sidebar from './components/Sidebar';
import Logo from '../Nav/navImg/logo.png';
import Category from '../Nav/navImg/category.png';
import UserIcon from '../Nav/navImg/user.png';
import './Nav.scss';
import { GET_TOP_CATEGORY_LIST_API } from '../../config';

const Nav = () => {
  const navigate = useNavigate();
  //login여부 확인 state, 나중에는 토큰 불러올 예정
  const [login, setLogin] = useState(true);
  //유저 페이지 이동 사이드바 구현
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  //햄버거 버튼 카테고리 구현
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const handleLogoClick = () => {
    setShowCategories(!showCategories);
  };

  //   fetch('/data/dummy.json', {

  // 백엔드 통신 데이터
  useEffect(() => {
    fetch(`${GET_TOP_CATEGORY_LIST_API}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((result) => {
        setCategories(result.message);
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
        {showCategories && <CategoryList categories={categories} />}
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
        {login ? (
          <img
            onClick={() => toggleSidebar()}
            className="user"
            src={UserIcon}
          />
        ) : (
          <p className="login"> 로그인 </p>
        )}
        {isOpen && <Sidebar />}
      </div>
    </div>
  );
};

export default Nav;
