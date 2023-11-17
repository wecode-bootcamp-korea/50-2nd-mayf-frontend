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
    <div className="userList">
      {currentItems.map((item) => {
        return (
          <div className="container" key={item.id}>
            <p className="cell">{item.name}</p>
            <p className="cell">{item.credit}</p>
            <p className="cell">{item.email}</p>
            <p className="cell">{item.phone_number}</p>
            <p className="cell">
              <button>X</button>
            </p>
          </div>
        );
      })}
      <div className="pageContainer">
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={userList.length}
          paginate={paginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default UserList;
