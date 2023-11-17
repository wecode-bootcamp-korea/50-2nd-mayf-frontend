import React from 'react';
import './Modal.scss';

const Modal = ({ closeModal, itemData }) => {
  return (
    <div className="modalOverlay" onClick={closeModal}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <h1>클래스 정보</h1>
        <div className="row">
          <div className="label">클래스명</div>
          <div className="data">{itemData.title}</div>
        </div>
        <div className="row">
          <div className="label">등대지기</div>
          <div className="data">{itemData.name}</div>
        </div>
        <div className="row">
          <div className="label">카테고리</div>
          <div className="data">
            {itemData.top_category_name} - {itemData.sub_category_name}
          </div>
        </div>
        <div className="row">
          <div className="label">주소</div>
          <div className="data">{itemData.address}</div>
        </div>
        <div className="row">
          <div className="label">내용</div>
          <div className="data">{itemData.content}</div>
        </div>
        <div className="row">
          <div className="label">가격</div>
          <div className="data">{parseInt(itemData.price)} 크레딧</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
