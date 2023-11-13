import React from 'react';
import Payment from './toss임시.png';
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
            <input
              className="radioInput"
              type="radio"
              name="radio"
              value={list.amount}
            />
            <label className="amount">{list.amount}</label>
          </div>
        ))}
      </div>
      <div className="paymentBox">
        <img className="payment" src={Payment} alt="toss" />
      </div>
      <label className="agreeLabel">
        <input type="checkbox" />
        약관동의
      </label>

      <div className="chargeBtnBox">
        <button type="button" className="btn">
          <span>충전하기</span>
        </button>
      </div>
    </div>
  );
};

export default Credit;

{
  /* <div className="selectBox">
        <button type="button" className="amount">
          20,000원
        </button>
        <button type="button" className="amount">
          30,000원
        </button>
        <button type="button" className="amount">
          50,000원
        </button>
      </div> */
}
