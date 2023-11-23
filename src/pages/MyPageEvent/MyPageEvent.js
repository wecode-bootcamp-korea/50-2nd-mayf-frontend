import React from 'react';
import MyPageEventHeader from '../../components/MyPageEventHeader/MyPageEventHeader';
import MyPageEventTab from '../../components/MyPageEventTab/MyPageEventTab';
import './MyPageEvent.scss';

const MyPageEvent = () => {
  return (
    <div className="myPageEvent">
      <div className="container">
        <MyPageEventHeader />

        <div className="contents">
          <MyPageEventTab />
          <div className="content" />
        </div>
      </div>
    </div>
  );
};

export default MyPageEvent;
