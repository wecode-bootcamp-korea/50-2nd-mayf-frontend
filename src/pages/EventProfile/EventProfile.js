import React, { useEffect, useState } from 'react';
import MyPageEventHeader from '../../components/MyPageEventHeader/MyPageEventHeader';
import MyPageEventTab from '../../components/MyPageEventTab/MyPageEventTab';
import './EventProfile.scss';

const EventProfile = () => {
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
    fetch(`http://10.58.52.102:8000/hosts`, {
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsIm5hbWUiOiLstZzrr7zsp4AiLCJlbWFpbCI6ImFsc3dsODE4NEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtNTU1NS0xMjM0Iiwicm9sZSI6Imhvc3RzIiwiaWF0IjoxNzAwNDU3Mzg3LCJleHAiOjE3MDExNzczODd9.5oy_-lmBlMC8SC3MXHc82-s64bsLJZfBm82JcjWrSXQ',
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
    fetch('http://10.58.52.102:8000/hosts/delete', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsIm5hbWUiOiLstZzrr7zsp4AiLCJlbWFpbCI6ImFsc3dsODE4NEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtNTU1NS0xMjM0Iiwicm9sZSI6Imhvc3RzIiwiaWF0IjoxNzAwNDU3Mzg3LCJleHAiOjE3MDExNzczODd9.5oy_-lmBlMC8SC3MXHc82-s64bsLJZfBm82JcjWrSXQ',
      },
    }).then((res) => {
      if (res.ok) {
        alert('회원탈퇴 완료');
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
    fetch('http://10.58.52.102:8000/hosts/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsIm5hbWUiOiLstZzrr7zsp4AiLCJlbWFpbCI6ImFsc3dsODE4NEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtNTU1NS0xMjM0Iiwicm9sZSI6Imhvc3RzIiwiaWF0IjoxNzAwNDU3Mzg3LCJleHAiOjE3MDExNzczODd9.5oy_-lmBlMC8SC3MXHc82-s64bsLJZfBm82JcjWrSXQ',
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

  return (
    <div className="eventProfile">
      <div className="container" onChange={setChangeUserInput}>
        <MyPageEventHeader />

        <div className="contents">
          <MyPageEventTab />
          <div className="content">
            이름
            <input type="text" value={userInput.name} name="name" />
            이메일
            <input type="text" value={hostData.email} readOnly />
            휴대폰 번호
            <input type="text" value={userInput.mobile} name="mobile" />
            보유 크레딧
            <input type="text" value={hostData.credit} readOnly />
            은행
            <input type="text" value={userInput.bank} name="bank" />
            계좌번호
            <input type="text" value={userInput.account} name="account" />
            <button onClick={editProfile}>수정하기</button>
            <button onClick={withdrawal}>회원 탈퇴</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventProfile;
