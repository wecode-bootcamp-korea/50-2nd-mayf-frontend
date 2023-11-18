import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    id: '',
    name: '',
    email: '',
    phone_number: '',
    credit: 0,
  });
  const [userData, setUserData] = useState({});
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsIm5hbWUiOiLquYDrrLjsmIEiLCJlbWFpbCI6Im1uNTJpbEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtMTIzNC01NTU1Iiwicm9sZSI6InVzZXJzIiwiaWF0IjoxNzAwMTk2NDMwLCJleHAiOjE3MDA5MTY0MzB9.WVYdWKjcFjLTyFQdPEKhLsy-XcmUa1B-cNfEcr1WOeI';

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    fetch('http://10.58.52.126:8000/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.userGetInfoList[0]);
      });
  };

  const handleUpdate = () => {
    if (!userInfo.name) {
      userInfo.email = userData.name;
    }
    if (!userInfo.phone_number) {
      userInfo.phone_number = userData.phone_number;
    }
    fetch('http://10.58.52.126:8000/users/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token,
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        alert('정보가 수정되었습니다');
        setUserInfo({
          id: '',
          name: '',
          email: '',
          phone_number: '',
          credit: 0,
        });
        getUser();
      });
  };
  console.log(userData);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <div className="info">개인 정보</div>
      <div>
        <p>{userData.email}</p>
      </div>
      <div>
        <p>{userData.name}</p>
        <input name="name" value={userInfo.name} onChange={handleChange} />
      </div>
      <div>
        <p>{userData.phone_number}</p>
        <input
          name="phone_number"
          value={userInfo.phone_number}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleUpdate}>수정</button>
    </div>
  );
};

export default Profile;
