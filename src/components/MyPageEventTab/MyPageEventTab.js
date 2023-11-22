import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MyPageEventTab.scss';

function MyPageTab() {
  const navigate = useNavigate();
  const menuArr = [
    { name: '정보 수정', page: 'profile' },
    { name: '강의 내역', page: 'classlist' },
    { name: '채팅', page: 'chatlist' },
    { name: '정산', page: 'calculate' },
  ];

  return (
    <div className="contentCategory">
      {menuArr.map((el, index) => (
        <button
          key={index}
          onClick={() => navigate(`/my-page-event-${el.page}`)}
        >
          {el.name}
        </button>
      ))}
    </div>
  );
}

export default MyPageTab;
