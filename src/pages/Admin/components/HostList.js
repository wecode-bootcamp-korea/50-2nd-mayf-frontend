import React, { useEffect, useState } from 'react';
import Pagination from '../../../components/Pagination/Pagination';
import './HostList.scss';

const HostList = () => {
  const [hostList, setHostList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = hostList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const token = localStorage.getItem('token');
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtaW5faWQiOiJhZG1pbjExMDgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTk5NTU1MDB9.MjN3UL4Ie0qnk2owFiqy0cONldqVNtbjFjZj9zJK6Ig';

  useEffect(() => {
    getHostList();
  }, []);

  const getHostList = () => {
    fetch('http://34.64.172.211:8000/admins/hostlist', {
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
        setHostList(data.message);
      })
      .catch((error) => {
        console.error('Fetch error:', error.message);
      });
  };

  const handleDelete = (itemId) => {
    const ok = window.confirm('정말 삭제하시겠습니까?');
    if (ok) {
      fetch(`http://34.64.172.211:8000/admins/hosts/${itemId}`, {
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
          getHostList();
        })
        .catch((error) => {
          console.error('Fetch error:', error.message);
        });
    }
  };

  const handleRestore = (itemId) => {
    const isDeleted = hostList.find(({ id }) => id === itemId).deleted_at;

    if (!isDeleted) return;

    fetch(`http://34.64.172.211:8000/admins/hosts/update/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert('호스트가 복구되었습니다');
          getHostList();
        } else {
          throw new Error(`Error status : ${res.status}`);
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error.message);
      });
  };

  return (
    <div className="hostList">
      <div>
        {currentItems.map((item) => {
          const isDeleted = item.deleted_at !== null;

          return (
            <div className="container" key={item.id}>
              <p className="cell host">
                {item.name}
                {isDeleted && '(삭제됨)'}
              </p>
              <p className="cell num">
                {item.credit.toLocaleString('ko-kr')} C
              </p>
              <p className="cell email">{item.email}</p>
              <p className="cell phone">{item.phone_number}</p>
              <p className="cell account">{item.bank_account}</p>
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
          totalItems={hostList.length}
          paginate={paginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default HostList;
