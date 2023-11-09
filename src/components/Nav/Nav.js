import React, { useState } from 'react';
import Logo from '../Nav/navImg/logo.png';
import Category from '../Nav/navImg/category.png';
import './Nav.scss';

//categoryLogo = 전체 카테고리 표시
//로그인시 하나의 아이콘으로 표시
//클릭시 useOutsideClick

const Nav = () => {
  const [login, setLogin] = useState(false);

  return (
    <div className="Nav">
      <div className="categoryLogo">
        <img className="category" src={Category} alt="categoryIcon" />
        <img className="logo" src={Logo} alt="logo" />
      </div>

      <p className="login"> 로그인 </p>
    </div>
  );
};

export default Nav;

{
  /* <div className="icons">
<img className="icon" src={User} alt="user" />
<img className="icon" src={Heart} alt="heart" />
<img className="icon" src={Coin} alt="credit" />
</div> */
}
