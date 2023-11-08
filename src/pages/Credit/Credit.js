import React from 'react';
import CreditIcon from './credit.png';
import './Credit.scss';

const Credit = () => {
  return (
    <div className="credit">
      <div className="header">
        <h1 className="title">Credit</h1>
      </div>
      <div className="iconBox">
        <img className="icon" src={CreditIcon} alt="class" />
      </div>
      <div className="selectBox">
        <div className="amount">10,000원</div>
        <div className="amount">30,000원</div>
        <div className="amount">50,000원</div>
      </div>
      <div>결제위젯(토스)</div>
      <label className="agreeLabel">
        <input type="checkbox"></input>
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
