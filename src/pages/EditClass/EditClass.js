import React, { useEffect, useState } from 'react';
import Post from '../../components/Post/Post';
import MyPageEventHeader from '../../components/MyPageEventHeader/MyPageEventHeader';
import MyPageEventTab from '../../components/MyPageEventTab/MyPageEventTab';
import './EditClass.scss';
import { useNavigate, useParams } from 'react-router-dom';

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

const EditClass = () => {
  const navigate = useNavigate();
  const { classId } = useParams();
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

  const [classData, setClassData] = useState([]);
  useEffect(() => {
    fetch(`http://34.64.172.211:8000/classes/${classId}`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsIm5hbWUiOiLstZzrr7zsp4AiLCJlbWFpbCI6ImFsc3dsODE4NEBuYXZlci5jb20iLCJwaG9uZV9udW1iZXIiOiIwMTAtMTExMS05OTk5Iiwicm9sZSI6Imhvc3RzIiwiaWF0IjoxNzAwNTQ1NjgyLCJleHAiOjE3MDEyNjU2ODJ9.8V1tTOzgJOFcCdmBiiJGtIkE298k7BsQhUbk733D3pg',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClassData(data.message);
      });
  }, [classId]);

  const [selectedTopCategory, setSelectedTopCategory] = useState(
    categories[0].name,
  );

  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  useEffect(() => {
    // 서버에서 받아온 classData의 sub_category_name을 선택된 상위 카테고리의 서브 카테고리 목록 중에서 찾습니다.
    const subCategories = categories.find(
      (category) => category.name === selectedTopCategory,
    )?.subcategories;

    // 찾은 subCategories 중에 classData의 sub_category_name이 있다면 해당 값을 사용하고,
    // 없다면 subCategories의 첫 번째 값을 사용합니다.
    setSelectedSubCategory(
      subCategories?.includes(classData.sub_category_name)
        ? classData.sub_category_name
        : subCategories?.[0] || '',
    );
  }, [selectedTopCategory, classData.sub_category_name]);

  const setTopCategory = (event) => {
    const { value } = event.target;
    console.log('selected Top Category:', value);
    setSelectedTopCategory(value);

    const subCategories =
      categories.find((category) => category.name === value)?.subcategories ||
      [];

    setSelectedSubCategory(classData.sub_category_name || ''); // 수정된 부분
    setUserInput((prevUserInput) => {
      const subCategories =
        categories.find((category) => category.name === value)?.subcategories ||
        [];

      return {
        ...prevUserInput,
        topCategoryName: value,
        subCategoryName: subCategories.includes(classData.sub_category_name)
          ? classData.sub_category_name
          : subCategories[0] || '', // 수정된 부분
      };
    });
  };

  const setSubCategory = (event) => {
    const { value } = event.target;
    setSelectedSubCategory(value);
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      subCategoryName: value,
    }));

    // 비동기적 업데이트로 인한 지연을 고려하여 setTimeout 사용
    setTimeout(() => {
      console.log('Selected Sub Category After Set:', selectedSubCategory);
    }, 0);
  };

  useEffect(() => {
    setSubCategory({
      target: { value: classData.sub_category_name || '' },
    });
  }, []);

  useEffect(() => {
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      title: classData.title || '',
      topCategoryName: classData.top_category_name || '',
      subCategoryName: classData.sub_category_name || '',
      summary: classData.summary || '',
      content: classData.content || '',
      price: classData.price || '',
      mainImageSource: classData.main_image_source || '',
      subImageSource: classData.sub_image_source || '',
      address: classData.address || '',
    }));
    // 여기에서 setSelectedTopCategory 설정 추가
    setSelectedTopCategory(classData.top_category_name || '');
  }, [classData]);

  const [popup, setPopup] = useState(false);

  const setChangeUserInput = (event) => {
    const { name, value } = event.target;
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      [name]: value,
    }));
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

  const editClassButton = () => {
    fetch(`http://34.64.172.211:8000/classes/update/${classId}`, {
      method: 'PUT',
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
        if (data.message.message === 'UPDATE_CLASS_SUCCESS') {
          alert('강의 수정 완료');
          navigate('/my-page-event-classlist');
        }
      });
  };

  return (
    <div className="editClass">
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
                <div className="infoInput">
                  <input
                    type="file"
                    name="mainImageSource"
                    onChange={(e) => handleImageChange(e, 'mainImageSource')}
                    multiple
                    accept="image/*"
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
                    accept="image/*"
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
            <div className="editClassBtnBox">
              <button className="editClassBtn" onClick={editClassButton}>
                강의 수정
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditClass;
