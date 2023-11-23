import React from 'react';
import MyPageEventHeader from '../../components/MyPageEventHeader/MyPageEventHeader';
import MyPageEventTab from '../../components/MyPageEventTab/MyPageEventTab';
import './MyPageEvent.scss';

const MyPageEvent = () => {
  const role = localStorage.getItem('role');
  return role === 'hosts' ? (
    <div className="myPageEvent">
      <div className="container">
        <MyPageEventHeader />

        <div className="contents">
          <MyPageEventTab />
          <div className="content" />
        </div>
      </div>
    </div>
  ) : (
    (window.location.href = '/')
  );
};

export default MyPageEvent;
