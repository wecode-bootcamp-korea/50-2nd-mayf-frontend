import React, { useState } from 'react';
import Post from '../../components/Post/Post';
import MyPageEventHeader from '../../components/MyPageEventHeader/MyPageEventHeader';
import MyPageEventTab from '../../components/MyPageEventTab/MyPageEventTab';
import './AddClass.scss';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    name: '상위 카테고리',
    subcategories: ['하위 카테고리'],
  },
  {
    name: '운동',
    subcategories: [
      '하위 카테고리',
      '헬스',
      '필라테스',
      '요가',
      '크로스핏',
      '축구',
      '기타',
    ],
  },
  {
    name: '예술',
    subcategories: [
      '하위 카테고리',
      '엔터테인먼트',
      '미술',
      '사진/영상',
      '기타',
    ],
  },
  {
    name: '공예',
    subcategories: [
      '하위 카테고리',
      '주얼리',
      '비누',
      '향수',
      '목공',
      '가죽',
      '기타',
    ],
  },
  {
    name: '외국어',
    subcategories: [
      '하위 카테고리',
      '영어',
      '한국어',
      '중국어',
      '일본어',
      '스페인어',
      '기타',
    ],
  },
  {
    name: '요리',
    subcategories: [
      '하위 카테고리',
      '베이킹',
      '한식',
      '양식',
      '일식',
      '중식',
      '기타',
    ],
  },
  {
    name: '게임',
    subcategories: ['하위 카테고리', 'RTS', 'FPS', '스포츠', '캐주얼', '기타'],
  },
  {
    name: '프로그래밍',
    subcategories: [
      '하위 카테고리',
      'Javascript',
      'Java',
      'C/C++/C#',
      'Python',
      '기타',
    ],
  },
  {
    name: '기타',
    subcategories: ['하위 카테고리', '기타'],
  },
];

const AddClass = () => {
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
  const [popup, setPopup] = useState(false);

  const [selectedTopCategory, setSelectedTopCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  const setTopCategory = (event) => {
    const { value } = event.target;
    setSelectedTopCategory(value);

    const subCategories =
      categories.find((category) => category.name === value)?.subcategories ||
      [];
    setUserInput({
      ...userInput,
      topCategoryName: value,
      subCategoryName: subCategories[0] || '',
    });
  };

  const setSubCategory = (event) => {
    const { value } = event.target;
    setSelectedSubCategory(value);
    setUserInput({
      ...userInput,
      subCategoryName: value,
    });
  };

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
      const response = await fetch('http://34.64.172.211:8000/images/', {
        method: 'POST',
        headers: {
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsIm5hbWUiOiLstZzrr7zsp4AiLCJlbWFpbCI6ImFsc3dsODE4NEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtMTExMS05OTk5Iiwicm9sZSI6Imhvc3RzIiwiaWF0IjoxNzAwNTQ1NjgyLCJleHAiOjE3MDEyNjU2ODJ9.8V1tTOzgJOFcCdmBiiJGtIkE298k7BsQhUbk733D3pg',
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
    fetch('http://34.64.172.211:8000/classes/createclass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsIm5hbWUiOiLstZzrr7zsp4AiLCJlbWFpbCI6ImFsc3dsODE4NEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtMTExMS05OTk5Iiwicm9sZSI6Imhvc3RzIiwiaWF0IjoxNzAwNTQ1NjgyLCJleHAiOjE3MDEyNjU2ODJ9.8V1tTOzgJOFcCdmBiiJGtIkE298k7BsQhUbk733D3pg',
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
                <div className="label makeName">강의명</div>
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
                    value={selectedTopCategory}
                    onChange={setTopCategory}
                  >
                    {categories.map((category) => (
                      <option key={category.name} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>

                  <select
                    className="subCategory"
                    name="subCategoryName"
                    id="subCategoryName"
                    value={selectedSubCategory}
                    onChange={setSubCategory}
                  >
                    {categories
                      .find((category) => category.name === selectedTopCategory)
                      ?.subcategories.map((subCategory) => (
                        <option key={subCategory} value={subCategory}>
                          {subCategory}
                        </option>
                      ))}
                  </select>
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
                <div className="fileBox">
                  <label className="chooseFile" htmlFor="mainImageSource">
                    파일 선택
                  </label>
                  <input
                    id="mainImageSource"
                    type="file"
                    name="mainImageSource"
                    multiple
                    onChange={(e) => handleImageChange(e, 'mainImageSource')}
                  />
                  <div className="fileName">
                    {userInput.mainImageSource
                      ? userInput.mainImageSource
                      : '파일을 선택해주세요'}
                  </div>
                </div>
              </div>

              <div className="info">
                <div className="label">서브 사진</div>
                <div className="fileBox">
                  <label className="chooseFile" htmlFor="subImageSource">
                    파일 선택
                  </label>
                  <input
                    id="subImageSource"
                    type="file"
                    name="subImageSource"
                    multiple
                    onChange={(e) => handleImageChange(e, 'subImageSource')}
                  />
                  <div className="fileName">
                    {userInput.subImageSource
                      ? userInput.subImageSource
                      : '파일을 선택해주세요'}
                  </div>
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
              <div className="addClassBtnBox">
                <button className="btnRegister" onClick={addClassButton}>
                  강의 등록
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
