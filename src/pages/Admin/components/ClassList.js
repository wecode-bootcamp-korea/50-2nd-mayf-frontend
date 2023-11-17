import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import Pagination from '../../../components/Pagination/Pagination';
import './ClassList.scss';

const ClassList = () => {
  const [classList, setClassList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemData, setSelectedItemData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = classList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtaW5faWQiOiJhZG1pbjExMDgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTk5NTU1MDB9.MjN3UL4Ie0qnk2owFiqy0cONldqVNtbjFjZj9zJK6Ig';

  useEffect(() => {
    getClassList();
  }, []);

  const getClassList = () => {
    fetch('http://10.58.52.154:8000/classes/classeslist', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClassList(data.result.classList);
      });
  };

  const openModal = (itemId) => {
    fetch(`http://10.58.52.154:8000/classes/${itemId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSelectedItemData(data.message);
        setIsModalOpen(true);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (itemId) => {
    const ok = window.confirm('정말 삭제하시겠습니까?');
    if (ok) {
      fetch(`http://10.58.52.154:8000/classes/admin/delete/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
          getClassList();
        });
    }
  };

  return (
    <div className="classList">
      <div>
        {currentItems.map((item) => {
          return (
            <div
              className="container"
              key={item.id}
              onClick={() => openModal(item.id)}
            >
              <p className="cell title">{item.title}</p>
              <p className="cell name">{item.name}</p>
              <p className="cell classCategory">{item.top_category_name}</p>
              <p className="cell classCategory">{item.sub_category_name}</p>
              <p className="cell" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => handleDelete(item.id)}>삭제</button>
              </p>
            </div>
          );
        })}
      </div>
      <div className="pageContainer">
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={classList.length}
          paginate={paginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {isModalOpen && (
        <Modal closeModal={closeModal} itemData={selectedItemData} />
      )}
    </div>
  );
};

export default ClassList;
