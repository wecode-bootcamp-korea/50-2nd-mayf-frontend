import React, { useEffect, useState } from 'react';
import Post from '../../components/Post/Post';
import MyPageEventHeader from '../../components/MyPageEventHeader/MyPageEventHeader';
import MyPageEventTab from '../../components/MyPageEventTab/MyPageEventTab';
import SelectBox from '../SelectBox/SelectBox';
import './AddClass.scss';
import { useNavigate } from 'react-router-dom';

// const TOP_CATEGORIES = [
//   { category: '운동', subCategories: [{ category: '헬스' }] },
// ];

function AddClass({ setTab }) {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    title: '',
    topCategoryName: '',
    subCategoryName: '',
    summary: '',
    content: '',
    price: '',
    mainImageSource: null,
    subImageSource: null,
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

  const addressInput = () => {
    setPopup(!popup);
  };

  const handleImageUpload = async (image, imageType) => {
    const formData = new FormData();
    formData.append('images', image);

    try {
      const response = await fetch('http://10.58.52.68:8000/images/', {
        method: 'POST',
        headers: {
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksIm5hbWUiOiLquYDrrLjsmIEiLCJlbWFpbCI6Im1uNTJpbEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIrODIgMTAtNzU2Ni0xMDA1Iiwicm9sZSI6Imhvc3RzIiwiaWF0IjoxNjk5OTU2NzYxLCJleHAiOjE3MDA2NzY3NjF9.zIOF-jyzWRPZrhN3Zi1vaenwp1T_Qyr2U2lW5Vih0ec',
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUserInput({
          ...userInput,
          [imageType]: data.imageUrl,
        });
      } else {
        console.error('이미지 업로드 실패');
      }
    } catch (error) {
      console.error('이미지 업로드 중 오류 발생', error);
    }
  };

  const handleImageChange = (event, imageType) => {
    const files = event.target.files;
    if (files.length > 0) {
      for (const file of files) {
        handleImageUpload(file, imageType);
      }
    }
  };

  const addClassButton = () => {
    fetch('http://10.58.52.154:8000/classes/createclass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksIm5hbWUiOiLquYDrrLjsmIEiLCJlbWFpbCI6Im1uNTJpbEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIrODIgMTAtNzU2Ni0xMDA1Iiwicm9sZSI6Imhvc3RzIiwiaWF0IjoxNjk5OTU2NzYxLCJleHAiOjE3MDA2NzY3NjF9.zIOF-jyzWRPZrhN3Zi1vaenwp1T_Qyr2U2lW5Vih0ec',
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
          navigate('/my-page-event-classlist');
        }
      });
  };

  return (
    <div className="addClass">
      <div className="container" onChange={setChangeUserInput}>
        <MyPageEventHeader />

        <div className="contents">
          <MyPageEventTab />
          <div className="content">
            <button
              className="btnBack"
              onClick={() => navigate('/my-page-event-classlist')}
            >
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
                      <Post company={userInput} setCompany={setUserInput} />
                    </div>
                  )}
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
                    onChange={(e) => handleImageChange(e, 'mainImageSource')}
                    multiple
                  />
                </div>
              </div>

              <div className="info">
                <div className="label">서브 사진</div>
                <div className="infoInput">
                  <input
                    type="file"
                    name="subImageSource"
                    onChange={(e) => handleImageChange(e, 'subImageSource')}
                    multiple
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
      </div>
    </div>
  );
}

export default AddClass;
