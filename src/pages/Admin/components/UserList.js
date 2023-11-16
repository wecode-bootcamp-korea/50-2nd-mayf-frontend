import React, { useEffect, useState } from 'react';
import Pagination from '../../../components/Pagination/Pagination';
import './UserList.scss';

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtaW5faWQiOiJhZG1pbjExMDgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTk5NTU1MDB9.MjN3UL4Ie0qnk2owFiqy0cONldqVNtbjFjZj9zJK6Ig';

  useEffect(() => {
    fetch('http://10.58.52.195:8000/admins/users', {
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
      {currentItems.map((item) => {
        return (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.credit}</p>
            <p>{item.email}</p>
            <p>{item.phone_number}</p>
          </div>
        );
      })}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={userList.length}
        paginate={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default UserList;
