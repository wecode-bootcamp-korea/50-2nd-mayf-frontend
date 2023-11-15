import React, { useEffect, useState } from 'react';
import './HostList.scss';

const HostList = () => {
  const [hostList, setHostList] = useState([]);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtaW5faWQiOiJhZG1pbjExMDgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTk5NTU1MDB9.MjN3UL4Ie0qnk2owFiqy0cONldqVNtbjFjZj9zJK6Ig';

  useEffect(() => {
    fetch('http://10.58.52.80:8000/admins/hosts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setHostList(data.adminHostInfoList);
      });
  }, []);

  return (
    <div className="HostList">
      {hostList.map((item) => {
        return (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.credit}</p>
            <p>{item.email}</p>
            <p>{item.phone_number}</p>
            <p>{item.bank_account}</p>
          </div>
        );
      })}
    </div>
  );
};

export default HostList;
