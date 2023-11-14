import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const KAKAOcredit = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const pg_token = searchParams.get('pg_token');
  const tid = localStorage.getItem('tid');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://10.58.52.157:8000/orders/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token,
      },
      body: JSON.stringify({ tid, pg_token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'CREDIT_CHARGED') {
          alert('충전이 완료되었습니다');
          localStorage.removeItem('tid');
          navigate('/');
        } else {
          alert('충전 과정에서 오류가 발생했습니다. 고객센터에 문의해주세요');
          navigate('/credit');
        }
      });
  });
  return <></>;
};

export default KAKAOcredit;
