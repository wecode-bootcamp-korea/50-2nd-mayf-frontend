import React, { useEffect, useState } from 'react';
import './Calculate.scss';

const Calculate = () => {
  const [credit, setCredit] = useState();
  const [useCredit, setUseCredit] = useState(0);

  const setChangeUseCredit = (event) => {
    setUseCredit(event.target.value);
  };

  const getCredit = () => {
    fetch('http://34.64.172.211:8000/hosts', {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsIm5hbWUiOiLstZzrr7zsp4AiLCJlbWFpbCI6ImFsc3dsODE4NEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtMTExMS05OTk5Iiwicm9sZSI6Imhvc3RzIiwiaWF0IjoxNzAwNTQ1NjgyLCJleHAiOjE3MDEyNjU2ODJ9.8V1tTOzgJOFcCdmBiiJGtIkE298k7BsQhUbk733D3pg',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCredit(data.hostInfoList[0].credit);
      });
  };

  useEffect(() => {
    getCredit();
  }, []);

  const completeCal = () => {
    fetch('http://34.64.172.211:8000/orders/adjust', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsIm5hbWUiOiLstZzrr7zsp4AiLCJlbWFpbCI6ImFsc3dsODE4NEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtMTExMS05OTk5Iiwicm9sZSI6Imhvc3RzIiwiaWF0IjoxNzAwNTQ1NjgyLCJleHAiOjE3MDEyNjU2ODJ9.8V1tTOzgJOFcCdmBiiJGtIkE298k7BsQhUbk733D3pg',
      },
      body: JSON.stringify({
        amount: useCredit,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'ADJUST_COMPLETED') {
          alert('정산이 완료되었습니다.');
          getCredit();
          setUseCredit(0);
        }
      });
  };

  return (
    <div className="calculate">
      <div className="container">
        <div className="credit">
          <input type="text" value={useCredit} onChange={setChangeUseCredit} />
          <div>보유 크레딧 : {credit}P</div>
          <div>수수료 20% 적용</div>
          <div>
            예상 정산가 : {useCredit === undefined ? 0 : useCredit * 0.8}원
          </div>
          <button className="completeBtn" onClick={completeCal}>
            정산하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculate;
