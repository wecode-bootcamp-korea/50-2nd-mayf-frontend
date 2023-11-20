import React, { useEffect, useState } from 'react';
import './Calculate.scss';
import { useNavigate } from 'react-router-dom';

const Calculate = () => {
  const [credit, setCredit] = useState();
  const navigate = useNavigate();

  const setChangeCredit = (event) => {
    setCredit(event.target.value);
  };

  useEffect(() => {
    fetch('http://10.58.52.102:8000/hosts', {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsIm5hbWUiOiLstZzrr7zsp4AiLCJlbWFpbCI6ImFsc3dsODE4NEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtNTU1NS0xMjM0Iiwicm9sZSI6Imhvc3RzIiwiaWF0IjoxNzAwNDU3Mzg3LCJleHAiOjE3MDExNzczODd9.5oy_-lmBlMC8SC3MXHc82-s64bsLJZfBm82JcjWrSXQ',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCredit(data.hostInfoList[0].credit);
      });
  }, []);

  const completeCal = () => {
    fetch('http://10.58.52.140:8000/orders/adjust', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsIm5hbWUiOiLstZzrr7zsp4AiLCJlbWFpbCI6ImFsc3dsODE4NEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtNTU1NS0xMjM0Iiwicm9sZSI6Imhvc3RzIiwiaWF0IjoxNzAwNDU3Mzg3LCJleHAiOjE3MDExNzczODd9.5oy_-lmBlMC8SC3MXHc82-s64bsLJZfBm82JcjWrSXQ',
      },
      body: JSON.stringify({
        amount: credit,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          alert('정산이 완료되었습니다.');
          // navigate('/my-page-event');
        }
      });
  };

  return (
    <div className="calculate">
      <div className="container">
        <div className="credit">
          <input type="text" />
          <div>보유 크레딧 : {credit}P</div>
          <div>수수료 20% 적용</div>
          <div>예상 정산가 : {credit * 0.8}원</div>
          <button
            className="completeBtn"
            onClick={completeCal}
            value={credit}
            onChange={setChangeCredit}
          >
            정산하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculate;
