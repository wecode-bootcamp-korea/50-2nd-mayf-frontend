import React, { useState } from 'react';
import './MyPageUser.scss';
import Profile from '../../components/Profile/Profile';
import Reservation from '../../components/Reservation/Reservation';
import WishList from '../../components/WishList/WishList';
import Credit from '../../components/Credit/Credit';
import { useNavigate } from 'react-router-dom';

const MyPageUser = () => {
  const role = localStorage.getItem('role');
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  const menuArr = [
    { name: '정보 수정', content: <Profile /> },
    {
      name: '예약 내역',
      content: <Reservation />,
    },
    {
      name: '위시 리스트',
      content: <WishList />,
    },
    { name: '크레딧', content: <Credit /> },
  ];

  const selectMenu = (index) => {
    setTab(index);
  };

  return role === 'users' ? (
    <div className="myPageUser">
      <div className="container">
        <div className="header">
          <div className="headerTitle">하루의 공간</div>
        </div>

        <div className="contents">
          <div className="contentCategory">
            {menuArr.map((item, idx) =>
              item.name === '크레딧' ? (
                <button key={item} onClick={() => navigate('/credit')}>
                  {item.name}
                </button>
              ) : (
                <button key={item} onClick={() => selectMenu(idx)}>
                  {item.name}
                </button>
              ),
            )}
          </div>
          <div className="content">{menuArr[tab].content}</div>
        </div>
      </div>
    </div>
  ) : (
    (window.location.href = '/')
  );
};

export default MyPageUser;
