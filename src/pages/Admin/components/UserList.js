import React, { useEffect, useState } from 'react';
import Pagination from '../../../components/Pagination/Pagination';
import './UserList.scss';

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtaW5faWQiOiJhZG1pbjExMDgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTk5NTU1MDB9.MjN3UL4Ie0qnk2owFiqy0cONldqVNtbjFjZj9zJK6Ig';

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = () => {
    fetch('http://34.64.172.211:8000/admins/userlist', {
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
        setUserList(data.message);
      })
      .catch((error) => {
        console.error('Fetch error:', error.message);
      });
  };

  const handleDelete = (itemId) => {
    const ok = window.confirm('정말 삭제하시겠습니까?');
    if (ok) {
      fetch(`http://34.64.172.211:8000/admins/users/${itemId}`, {
        method: 'PUT',
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
          alert(data.result.message);
          getUserList();
        })
        .catch((error) => {
          console.error('Fetch error:', error.message);
        });
    }
  };

  const handleRestore = (itemId) => {
    const isDeleted = userList.find(({ id }) => id === itemId).deleted_at;

    if (!isDeleted) return;

    fetch(`http://34.64.172.211:8000/admins/users/update/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert('유저가 복구되었습니다');
          getUserList();
        } else {
          throw new Error(`Error status : ${res.status}`);
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error.message);
      });
  };

  return (
    <div className="userList">
      <div>
        {currentItems.map((item) => {
          const isDeleted = item.deleted_at !== null;

          return (
            <div className="container" key={item.id}>
              <p className="cell user">
                {item.name}
                {isDeleted && '(삭제됨)'}
              </p>
              <p className="cell num">{item.credit}</p>
              <p className="cell email">{item.email}</p>
              <p className="cell phone">{item.phone_number}</p>
              <p className="cell">
                <button
                  disabled={isDeleted}
                  onClick={() => handleDelete(item.id)}
                  className="btn"
                >
                  삭제
                </button>
              </p>
              <p className="cell">
                <button
                  disabled={!isDeleted}
                  onClick={() => handleRestore(item.id)}
                  className="btn"
                >
                  복구
                </button>
              </p>
            </div>
          );
        })}
      </div>

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
