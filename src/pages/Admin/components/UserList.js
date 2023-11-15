import React, { useEffect, useState } from 'react';
import './UserList.scss';

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtaW5faWQiOiJhZG1pbjExMDgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTk5NTU1MDB9.MjN3UL4Ie0qnk2owFiqy0cONldqVNtbjFjZj9zJK6Ig';

  useEffect(() => {
    fetch('http://10.58.52.80:8000/admins/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserList(data.adminUserGetInfoList);
      });
  }, []);

  return (
    <div className="UserList">
      {userList.map((item) => {
        return (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.credit}</p>
            <p>{item.email}</p>
            <p>{item.phone_number}</p>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
