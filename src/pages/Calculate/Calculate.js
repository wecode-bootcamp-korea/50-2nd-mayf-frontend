import React, { useEffect, useState } from 'react';
import './Calculate.scss';
import { useNavigate } from 'react-router-dom';

const Calculate = () => {
  const [credit, setCredit] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: '',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCredit(data);
      });
  }, []);

  const completeCal = () => {
    fetch('', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: '',
      },
      body: JSON.stringify({
        credit,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          alert('정산이 완료되었습니다.');
          navigate('/my-page-event');
        }
      });
  };

  return (
    <div className="calculate">
      <div className="container">
        <div className="credit">
          <input type="text" />
          <div>수수료 20% 적용</div>
          <div>예상 정산가 : </div>
          <button className="completeBtn" onClick={completeCal}>
            정산하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculate;
