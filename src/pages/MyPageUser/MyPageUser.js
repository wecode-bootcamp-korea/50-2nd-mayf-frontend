import React, { useState } from 'react';
import './MyPageUser.scss';
import Profile from '../../components/Profile/Profile';
import Reservation from '../../components/Reservation/Reservation';
import WishList from '../../components/WishList/WishList';
import Credit from '../../components/Credit/Credit';

const MyPageUser = () => {
  const [tab, setTab] = useState(0);
  const menuArr = [
    { name: '정보 수정', content: <Profile /> },
    { name: '예약 내역', content: <Reservation /> },
    { name: '위시 리스트', content: <WishList /> },
    { name: '크레딧', content: <Credit /> },
  ];

  const selectMenu = (index) => {
    setTab(index);
  };

  return (
    <div className="myPageUser">
      <div className="container">
        <div className="header">
          <div className="headerTitle">헤더 타이틀</div>
        </div>

        <div className="contents">
          <div className="contentCategory">
            {menuArr.map((el, index) => (
              <button key={index} onClick={() => selectMenu(index)}>
                {el.name}
              </button>
            ))}
          </div>
          <div className="content">{menuArr[tab].content}</div>
        </div>
      </div>
    </div>
  );
};

export default MyPageUser;
