import React from 'react';
import './Modal.scss';

const Modal = ({ isOpen, closeModal, itemId, itemData }) => {
  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h1>클래스 정보</h1>
            <div className="cell">{itemData.title}</div>
            <div className="cell">{itemData.name}</div>
            <div className="cell">{itemData.address}</div>
            <div className="cell">{itemData.content}</div>
            <div className="cell">{itemData.price} 크레딧</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
