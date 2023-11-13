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
    latitude: '',
    longitude: '',
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
    fetch(`http://10.58.52.181:8000/classes/createclass`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksIm5hbWUiOiLquYDrrLjsmIEiLCJlbWFpbCI6Im1uNTJpbEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIrODIgMTAtNzU2Ni0xMDA1IiwiaWF0IjoxNjk5ODUyOTIyLCJleHAiOjE3MDA1NzI5MjJ9.xXkTtAVKIt20xCfIUbOvSeoY44pi-ScH6Agy9jdd4fE',
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
        latitude: 32,
        longitude: 127,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result === 'CREATE_CLASS_SUCCESS')
          return alert('강의 생성 완료');
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
              {popup && (
                <div>
                  <Post company={userInput.address} setCompany={setUserInput} />
                </div>
              )}
              <button onClick={addressInput}>주소 찾기</button>

              <input
                type="text"
                required={true}
                name="address"
                value={userInput.address}
              />
              <input type="hidden" name="latitude" value={userInput.latitude} />
              <input
                type="hidden"
                name="longitude"
                value={userInput.longitude}
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
