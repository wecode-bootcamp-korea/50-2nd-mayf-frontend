import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const KAKAOcredit = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const pg_token = searchParams.get('pg_token');
  const tid = localStorage.getItem('tid');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('https://kapi.kakao.com/v1/payment/approve', {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `KakaoAK ${process.env.REACT_APP_PAY_ADMIN_KEY}`,
      },
      body: new URLSearchParams({
        cid: 'TC0ONETIME',
        tid,
        partner_order_id: 'partner_order_id',
        partner_user_id: 'partner_user_id',
        pg_token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        postPay(data.amount.total);
      });
  });

  const postPay = (total) => {
    fetch('http://10.58.52.231:8000/orders/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token,
      },
      body: JSON.stringify(total),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'CREDIT_CHARGED') {
          alert('충전이 완료되었습니다');
          navigate('/');
        } else {
          alert('충전 과정에서 오류가 발생했습니다. 고객센터에 문의해주세요');
          navigate('/');
        }
      });
  };
  return <></>;
};

export default KAKAOcredit;
