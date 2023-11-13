import React, { useState } from 'react';
import './MyPageUser.scss';
import TabContent from '../../components/TabContent/TabContent';

const MyPageUser = () => {
  let [tab, setTab] = useState(0);

  return (
    <div className="myPageUser">
      <div className="container">
        <div className="header">
          <div className="headerTitle">헤더 타이틀</div>
        </div>

        <div className="contents">
          <div className="contentCategory">
            <button onClick={() => setTab(0)}>정보 수정</button>

            <button onClick={() => setTab(1)}>예약 내역</button>

            <button onClick={() => setTab(2)}>위시 리스트</button>

            <button onClick={() => setTab(3)}>크레딧</button>
          </div>
          <div className="content">
            <TabContent tab={tab} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageUser;
