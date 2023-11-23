import React, { useEffect, useState } from 'react';
import MyPageEventHeader from '../../components/MyPageEventHeader/MyPageEventHeader';
import MyPageEventTab from '../../components/MyPageEventTab/MyPageEventTab';
import './EventProfile.scss';
import { useNavigate } from 'react-router-dom';

const EventProfile = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    mobile: '',
    credit: '',
    bank: '',
    account: '',
  });

  const [hostData, setHostData] = useState([]);

  useEffect(() => {
    fetch(`http://34.64.172.211:8000/hosts`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setHostData(data.hostInfoList[0]);
      });
  }, []);

  useEffect(() => {
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      name: hostData.name || '',
      mobile: hostData.phone_number || '',
      bank: hostData.bank_account ? hostData.bank_account.split(' ')[0] : '',
      account: hostData.bank_account ? hostData.bank_account.split(' ')[1] : '',
    }));
  }, [hostData]);

  const withdrawal = () => {
    fetch('http://34.64.172.211:8000/hosts/delete', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    }).then((res) => {
      if (res.ok) {
        alert('회원탈퇴 완료');
        localStorage.clear();
        navigate('/');
      }
    });
  };

  const setChangeUserInput = (event) => {
    const { name, value } = event.target;
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      [name]: value,
    }));
  };

  const editProfile = () => {
    fetch('http://34.64.172.211:8000/hosts/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        name: userInput.name,
        phone_number: userInput.mobile,
        bank_account: userInput.bank + ' ' + userInput.account,
      }),
    }).then((res) => {
      if (res.ok) {
        alert('회원 정보 수정 완료');
      }
    });
  };

  const numWithComma = (a) => {
    return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="eventProfile">
      <div className="container" onChange={setChangeUserInput}>
        <MyPageEventHeader />

        <div className="contents">
          <MyPageEventTab />
          <div className="content">
            <div className="mainLabel">개인 정보 수정</div>
            <div className="profileInfo">
              <div className="info">
                <div className="label name">이름</div>
                <div className="infoInput">
                  <input type="text" value={userInput.name} name="name" />
                </div>
              </div>

              <div className="info">
                <div className="label">이메일</div>
                <div className="infoInput">
                  <input type="text" value={hostData.email} readOnly />
                </div>
              </div>

              <div className="info">
                <div className="label">휴대폰 번호</div>
                <div className="infoInput">
                  <input type="text" value={userInput.mobile} name="mobile" />
                </div>
              </div>

              <div className="info">
                <div className="label">보유 크레딧</div>
                <div className="infoInput">
                  <input
                    type="text"
                    value={
                      hostData.credit !== undefined
                        ? hostData.credit.toLocaleString('ko-KR')
                        : 0
                    }
                    readOnly
                  />
                </div>
              </div>

              <div className="info">
                <div className="label">은행</div>
                <div className="infoInput">
                  <input type="text" value={userInput.bank} name="bank" />
                </div>
              </div>

              <div className="info">
                <div className="label">계좌번호</div>
                <div className="infoInput">
                  <input type="text" value={userInput.account} name="account" />
                </div>
              </div>
            </div>
            <div className="buttons">
              <button className="editBtn" onClick={editProfile}>
                수정하기
              </button>
              <button className="withdrawalBtn" onClick={withdrawal}>
                회원 탈퇴
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventProfile;
