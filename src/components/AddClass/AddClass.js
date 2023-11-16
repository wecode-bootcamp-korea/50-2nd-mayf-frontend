import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';
import './AddClass.scss';
import SelectBox from '../SelectBox/SelectBox';

function AddClass({ setTab }) {
  const [userInput, setUserInput] = useState({
    title: '',
    topCategoryName: '',
    subCategoryName: '',
    summary: '',
    content: '',
    price: '',
    mainImageSource: '',
    subImageSource: '',
    address: '',
  });

  useEffect(() => {
    SelectBox();
  }, []);

  const [popup, setPopup] = useState(false);

  const setChangeUserInput = (event) => {
    const newUserInput = {
      ...userInput,
      [event.target.name]: event.target.value,
    };
    setUserInput(newUserInput);
  };

  const addressInput = (data) => {
    setPopup(!popup);
  };

  const addClassButton = () => {
    // console.log(userInput);
    fetch(`http://10.58.52.154:8000/classes/createclass`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsIm5hbWUiOiLsnoTsi5ztmIQiLCJlbWFpbCI6ImpzbTAwOTI5QG5hdmVyLmNvbSIsInBob25lX251bWJlciI6Iis4MiAxMC05MTU5LTA1MDYiLCJpYXQiOjE2OTk5MzUyODMsImV4cCI6MTcwMDY1NTI4M30.oXtoBY1SoujOKSClsVQf2JM9QoBuhajNV1EVC3b3R4o',
      },
      body: JSON.stringify({
        title: userInput.title,
        topCategoryName: userInput.topCategoryName,
        subCategoryName: userInput.subCategoryName,
        summary: userInput.summary,
        content: userInput.content,
        price: userInput.price,
        mainImageSource: userInput.mainImageSource,
        subImageSource: userInput.subImageSource,
        address: userInput.address,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result.message === 'CREATE_CLASS_SUCCESS') {
          alert('강의 생성 완료');
        }
      });
  };
  return (
    <div className="addClass">
      <div className="container" onChange={setChangeUserInput}>
        <button className="btnBack" onClick={() => setTab(1)}>
          뒤로 가기
        </button>
        <div className="mainLabel">강의 정보 입력</div>
        <div className="classInfo">
          <div className="info">
            <div className="label">강의명</div>
            <div className="infoInput">
              <input
                type="text"
                placeholder="강의명을 입력해주세요."
                value={userInput.title}
                name="title"
              />
            </div>
          </div>

          <div className="info">
            <div className="label">강의 카테고리</div>
            <div className="categoryInfo">
              <select
                className="topCategory"
                name="topCategoryName"
                id="topCategoryName"
                value={userInput.topCategoryName}
              />

              <select
                className="subCategory"
                name="subCategoryName"
                id="subCategoryName"
                value={userInput.subCategoryName}
              />
            </div>
          </div>

          <div className="info">
            <div className="label">강의 내용(요약)</div>
            <div className="infoInput">
              <input
                type="text"
                placeholder="강의 내용을 요약해주세요."
                value={userInput.summary}
                name="summary"
              />
            </div>
          </div>

          <div className="info">
            <div className="label">강의 내용(상세)</div>
            <div className="infoInput">
              <input
                type="text"
                placeholder="250자 이내로 작성해주세요."
                value={userInput.content}
                name="content"
              />
            </div>
          </div>

          <div className="info">
            <div className="label">강의 장소</div>
            <div className="addressInfo">
              {popup && <Post company={userInput} setCompany={setUserInput} />}
              <button onClick={addressInput}>주소 찾기</button>

              <input
                type="text"
                required={true}
                name="address"
                value={userInput.address}
              />
            </div>
          </div>

          <div className="info">
            <div className="label">메인 사진</div>
            <div className="infoInput">
              <input
                type="file"
                name="mainImageSource"
                value={userInput.mainImageSource}
              />
            </div>
          </div>

          <div className="info">
            <div className="label">서브 사진</div>
            <div className="infoInput">
              <input
                type="file"
                value={userInput.subImageSource}
                name="subImageSource"
              />
            </div>
          </div>

          <div className="info">
            <div className="label">가격</div>
            <div className="infoInput">
              <input
                type="text"
                placeholder="가격을 지정해주세요."
                value={userInput.price}
                name="price"
              />
            </div>
          </div>
        </div>

        <button onClick={addClassButton}>강의 추가</button>
      </div>
    </div>
  );
}

export default AddClass;
