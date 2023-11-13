import React from 'react';
import './AddClass.scss';

function AddClass() {
  return (
    <div className="addClass">
      <div className="container">
        <button className="btnBack">뒤로 가기</button>
        <div className="mainLabel">강의 정보 입력</div>
        <div className="classInfo">
          <div className="info">
            <div className="label">강의명</div>
            <div className="infoInput">
              <input type="text" />
            </div>
          </div>

          <div className="info">
            <div className="label">강의 내용(요약)</div>
            <div className="infoInput">
              <input type="text" />
            </div>
          </div>

          <div className="info">
            <div className="label">강의 내용(상세)</div>
            <div className="infoInput">
              <input type="text" placeholder="250자 이내로 작성해주세요." />
            </div>
          </div>

          <div className="info">
            <div className="label">강의 장소</div>
            <div className="infoInput">
              <input type="text" />
            </div>
          </div>

          <div className="info">
            <div className="label">메인 사진</div>
            <div className="infoInput">
              <input type="text" />
            </div>
          </div>

          <div className="info">
            <div className="label">서브 사진</div>
            <div className="infoInput">
              <input type="text" />
            </div>
          </div>

          <div className="info">
            <div className="label">가격</div>
            <div className="infoInput">
              <input type="text" />
            </div>
          </div>
        </div>

        <button>강의 추가</button>
      </div>
    </div>
  );
}

export default AddClass;
