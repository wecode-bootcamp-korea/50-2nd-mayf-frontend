import React, { useEffect, useState } from 'react';
import Modal from '../../../components/Modal/Modal';
import './ClassList.scss';

const ClassList = () => {
  const [classList, setClassList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemData, setSelectedItemData] = useState({});
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
        setClassList(data.result.classList);
      });
  }, []);

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
        setSelectedItemData(data.message[0]);
        setSelectedItemId(itemId);
        setModalIsOpen(true);
      });
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="ClassList">
      {classList.map((item) => {
        return (
          <div key={item.id} onClick={() => openModal(item.id)}>
            <p className="title">{item.title}</p>
            <p className="name">{item.name}</p>
            <p className="top-category">{item.top_category_name}</p>
            <p className="sub-category">{item.sub_category_name}</p>
          </div>
        );
      })}
      <Modal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        itemId={selectedItemId}
        itemData={selectedItemData}
      />
    </div>
  );
};

export default ClassList;
