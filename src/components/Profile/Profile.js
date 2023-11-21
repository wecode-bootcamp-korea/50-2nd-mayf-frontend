import React, { useEffect, useState } from 'react';
import './Profile.scss';

const DEFAULT_USER_INFO = {
  id: '',
  name: '',
  email: '',
  phone_number: '',
  credit: 0,
};

const Profile = () => {
  const [userInfo, setUserInfo] = useState(DEFAULT_USER_INFO);
  const [isUpdate, setIsUpdate] = useState(false);
  // const token =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsIm5hbWUiOiLquYDrrLjsmIEiLCJlbWFpbCI6Im1uNTJpbEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtMTIzNC01NTU1Iiwicm9sZSI6InVzZXJzIiwiaWF0IjoxNzAwMTk2NDMwLCJleHAiOjE3MDA5MTY0MzB9.WVYdWKjcFjLTyFQdPEKhLsy-XcmUa1B-cNfEcr1WOeI';
  const token = localStorage.getItem('token');
  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    fetch('http://10.58.52.84:8000/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setUserInfo(data.userGetInfoList[0]);
      })
      .catch((error) => {
        console.error('Fetch error:', error.message);
      });
  };

  const handleUpdate = () => {
    fetch('http://10.58.52.238:8000/users/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token,
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        alert('정보가 수정되었습니다');
        setIsUpdate(false);
        setUserInfo(DEFAULT_USER_INFO);
        getUser();
      })
      .catch((error) => {
        console.error('Fetch error:', error.message);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value !== null) {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        [name]: value,
      }));
    }
  };

  return (
    <div className="profile">
      <div className="info">개인 정보</div>
      <div className="email">
        <p>{userInfo.email}</p>
      </div>
      <div className="name">
        <p>{userInfo.name}</p>
        <input
          disabled={!isUpdate}
          name="name"
          value={userInfo.name}
          onChange={handleChange}
        />
      </div>
      <div className="phone">
        <p>{userInfo.phone_number}</p>
        <input
          disabled={!isUpdate}
          name="phone_number"
          value={userInfo.phone_number}
          onChange={handleChange}
        />
      </div>
      {isUpdate ? (
        <>
          <button onClick={handleUpdate}>완료</button>
          <button onClick={() => setIsUpdate(false)}>취소</button>
        </>
      ) : (
        <button onClick={() => setIsUpdate(true)}>수정</button>
      )}
    </div>
  );
};

export default Profile;
