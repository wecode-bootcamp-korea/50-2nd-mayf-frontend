import React from 'react';
import Logo from './logo.png';
import Heart from './heart.png';
import User from './user.png';
import Category from './category.png';
import Coin from './credit.png';
import './Nav.scss';

const Nav = () => {
  return (
    <div className="Nav">
      <div className="categoryLogo">
        <img className="category" src={Category} alt="cetegoryIcon" />
        <img className="logo" src={Logo} alt="logo" />{' '}
      </div>
      <div className="content">
        <div className="header">Home</div>
        <div className="header">Class</div>
        <div className="header">Service</div>
        <div className="header">About</div>
      </div>
      <div className="icons">
        <img className="user icon" src={User} alt="user" />
        <img className="heart icon" src={Heart} alt="heart" />
        <img className="coin icon" src={Coin} alt="credit" />
        <p className="point">보유 포인트 10p</p>
      </div>
      <p>로그인 / 회원가입</p>
    </div>
  );
};

export default Nav;
