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
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtaW5faWQiOiJhZG1pbjExMDgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTk5NTU1MDB9.MjN3UL4Ie0qnk2owFiqy0cONldqVNtbjFjZj9zJK6Ig';

  useEffect(() => {
    getHostList();
  }, []);

  const getHostList = () => {
    fetch('http://10.58.52.126:8000/admins/hosts', {
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
  };

  const handleDelete = (itemId) => {
    const ok = window.confirm('정말 삭제하시겠습니까?');
    if (ok) {
      fetch(`http://10.58.52.126:8000/admins/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
          getHostList();
        });
    }
  };

  return (
    <div className="hostList">
      {currentItems.map((item) => {
        return (
          <div className="container" key={item.id}>
            <p className="cell">{item.name}</p>
            <p className="cell">{item.credit}</p>
            <p className="cell">{item.email}</p>
            <p className="cell">{item.phone_number}</p>
            <p className="cell">{item.bank_account}</p>
            <p className="cell">
              <button onClick={handleDelete}>삭제</button>
            </p>
          </div>
        );
      })}
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
