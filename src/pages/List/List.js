import React, { useState, useEffect } from 'react';
import { useLocation, Link, json } from 'react-router-dom';
import Sort from './components/Sort';
import Search from './components/Search';
import SubCategories from './components/SubCategories';
import API from '../../config';
import './List.scss';

const List = () => {
  const [classList, setClassList] = useState([]);
  //topCate를 눌렀을때 해당하는 subCate를 저장하는 state 생성
  const [subCategories, setSubCategories] = useState([]);
  const [search, setSearch] = useState('');
  //최근 본 상품을 저장하기 위한 state 생성
  const [recentlyViewedImages, setRecentlyViewedImages] = useState([]);
  //sortBy, subCategories를 필터링 하기위해 만든 queryString
  const location = useLocation();
  const queryString = location.search;

  // 클래스 클릭시 로컬스트로지에 저장할 함수 생성
  const updateRecentlyViewed = (product) => {
    const recentlyViewed = JSON.parse(localStorage.getItem('watched')) || [];
    //새로 클릭한 상품의 id가 이미 최근 본 상품 목록에 있는지 확인
    const isProductAlreadyViewed =
      Array.isArray(recentlyViewed) &&
      recentlyViewed.some((item) => item && item.id === product.id);

    if (!isProductAlreadyViewed) {
      recentlyViewed.unshift(product);
      if (recentlyViewed.length > 8) {
        recentlyViewed.pop();
      }
      // 로컬 스토리지에 최근 본 상품 저장
      localStorage.setItem('watched', JSON.stringify(recentlyViewed));
    }
  };
  //상품을 누른애 자체가 저장이 되게 현재는 id만 저장이되니까, id랑 image, title
  //내가 본 상품들을 배열로 해서 map
  useEffect(() => {
    const recentlyViewed = JSON.parse(localStorage.getItem('watched')) || [];
    setRecentlyViewedImages(recentlyViewed);
  }, [queryString, subCategories, classList]);

  const filterSearch = classList.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase()),
  );
  // fetch(`/data/listMockData.json${queryString}`,
  // `${API.list}${queryString}`
  // 백엔드 통신 데이터
  // useEffect(() => {
  //   const fetchData = () => {
  //     fetch(`${API.list}${queryString}`, {
  //       method: 'GET',
  //     })
  //       .then((res) => res.json())
  //       .then((result) => {
  //         setClassList(result.result.classList);
  //         setSubCategories(result.result.subCategoriesName);
  //       });
  //   };
  //   fetchData();
  // }, [queryString]);

  return (
    <div className="list">
      <div className="container">
        <div className="header">
          <div className="headerTitle">Class Page</div>
        </div>

        <div className="content">
          <div className="classBox">
            <SubCategories subCategories={subCategories} />
            <div className="classTab">
              <div className="labels">
                <div className="labelTitle">클래스 타이틀</div>
                <Search setSearch={setSearch} />
                <Sort />
              </div>
              <div className="classList">
                {filterSearch.map((list) => {
                  const { id, title, summery, name, image_source } = list;

                  return (
                    <div key={id} className="class">
                      <Link to={`/detail/${id}`}>
                        <div className="picture">
                          <img
                            onClick={() => {
                              updateRecentlyViewed({
                                id,
                                title,
                                image_source,
                                name,
                              });
                            }}
                            alt="상품이미지"
                            src={image_source}
                          />
                        </div>
                      </Link>
                      <div className="classTitle">{title}</div>
                      <div className="classLocation">{summery}</div>
                      <div className="classCredit">등대 : {name} </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="recentlyBox">
            <div className="recentlyViewedImages">
              <p className="recentlyWatched">최근 본 상품</p>
              {recentlyViewedImages.map((product) => (
                <div recentlyBox>
                  <Link to={`/detail/${product.id}`}>
                    <img
                      key={product.id}
                      src={product.image_source}
                      className="recentlyClass"
                      alt={`recentlyClass`}
                    />
                  </Link>
                  <p className="recentlyTitle">등대 : {product.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
