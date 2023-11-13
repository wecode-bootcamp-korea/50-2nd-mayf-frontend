import React, { useState } from 'react';
import './MyPageEvent.scss';
import TabContentEvent from '../../components/TabContentEvent/TabContentEvent';

const MyPageEvent = () => {
  let [tab, setTab] = useState(0);

  return (
    <div className="myPageEvent">
      <div className="container">
        <div className="header">
          <div className="headerTitle">헤더 타이틀</div>
        </div>

        <div className="contents">
          <div className="contentCategory">
            <button onClick={() => setTab(0)}>정보 수정</button>
            <button onClick={() => setTab(1)}>강의 내역</button>
            <button onClick={() => setTab(2)}>채팅</button>
            <button onClick={() => setTab(3)}>정산</button>
          </div>
          <TabContentEvent tab={tab} setTab={setTab} />
        </div>
      </div>
    </div>
  );
};

export default MyPageEvent;
