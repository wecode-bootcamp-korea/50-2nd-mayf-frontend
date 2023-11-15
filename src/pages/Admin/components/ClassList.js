import React, { useEffect, useState } from 'react';
import './ClassList.scss';

const ClassList = () => {
  const [classList, setClassList] = useState([]);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtaW5faWQiOiJhZG1pbjExMDgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTk5NTU1MDB9.MjN3UL4Ie0qnk2owFiqy0cONldqVNtbjFjZj9zJK6Ig';

  useEffect(() => {
    fetch('http://10.58.52.154:8000/classes/classeslist', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setClassList(data.message);
      });
  }, []);

  return (
    <div className="ClassList">
      {classList.map((item) => {
        return (
          <div key={item.id}>
            <p>{item.title}</p>
            <p>{item.name}</p>
            <p>{item.top_category_name}</p>
            <p>{item.sub_category_name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ClassList;
