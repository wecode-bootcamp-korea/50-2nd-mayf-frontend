import React, { useState } from 'react';
import CreditIcon from './credit.png';
import './Credit.scss';

const Credit = () => {
  const amountList = [
    { id: 1, amount: '5,000' },
    { id: 2, amount: '10,000' },
    { id: 3, amount: '15,000' },
    { id: 4, amount: '20,000' },
    { id: 5, amount: '30,000' },
    { id: 6, amount: '50,000' },
  ];
  const [amount, setAmount] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  const handlePay = () => {
    if (amount !== 0 && isChecked) {
      fetch('https://kapi.kakao.com/v1/payment/ready', {
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          Authorization: `KakaoAK ${process.env.REACT_APP_PAY_ADMIN_KEY}`,
        },
        body: new URLSearchParams({
          cid: 'TC0ONETIME',
          partner_order_id: 'partner_order_id',
          partner_user_id: 'partner_user_id',
          item_name: '하루살이 크레딧 충전',
          quantity: 1,
          total_amount: parseInt(amount) * 1000,
          tax_free_amount: 0,
          approval_url: 'http://localhost:3000/credit/KAKAOcredit',
          fail_url: 'http://localhost:3000/credit',
          cancel_url: 'http://localhost:3000/credit',
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const { next_redirect_pc_url, tid } = data;
          localStorage.setItem('tid', tid);
          window.location.href = next_redirect_pc_url;
        });
    }
  };
  return (
    <div className="credit">
      <div className="header">
        <h1 className="title">Credit</h1>
      </div>
      <div className="iconBox">
        <img className="icon" src={CreditIcon} alt="class" />
        <p className="holdingCredit">보유 크레딧 0 C</p>
      </div>
      <div className="selectBox">
        {amountList.map((list) => (
          <div key={list.id}>
            <label className="amount" onChange={() => setAmount(list.amount)}>
              <input
                className="radioInput"
                type="radio"
                name="radio"
                value={list.amount}
              />
              {list.amount}
            </label>
          </div>
        ))}
      </div>
      {/* <div className="paymentBox">
        <img className="payment" src={Payment} alt="toss" />
      </div> */}
      <label className="agreeLabel">
        <input type="checkbox" onChange={() => setIsChecked(!isChecked)} />
        약관동의
      </label>

      <div className="chargeBtnBox">
        <button type="button" className="btn" onClick={handlePay}>
          <img src="/images/payment_icon_yellow_large.png" alt="pay_btn" />
        </button>
      </div>
    </div>
  );
};

export default Credit;
