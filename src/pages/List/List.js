import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sort from './components/Sort';
import Search from './components/Search';
import SubCategories from './components/SubCategories';
import API from '../../config';
import './List.scss';

const List = () => {
  const [classList, setClassList] = useState([]);
  //topCate를 눌렀을때 해당하는 subCate를 저장하는 state 생성
  const [cateName, setCateName] = useState([]);
  const [search, setSearch] = useState('');
  //sortBy, subCategories를 필터링 하기위해 만든 queryString
  const location = useLocation();
  const queryString = location.search;

  const filterSearch = classList.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase()),
  );
  // fetch(`/data/listMockData.json${queryString}`,
  // `${API.list}${queryString}`
  // 백엔드 통신 데이터
  useEffect(() => {
    const fetchData = () => {
      fetch(`${API.list}${queryString}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((result) => {
          setClassList(result.result.classList);
          setCateName(result.result.subCategoriesName);
        });
    };
    fetchData();
  }, [queryString]);

  const subCategories = Array.from(new Set(cateName.map((res) => res.name)));

  return (
    <div className="list">
      <div className="container">
        <div className="header">
          <div className="headerTitle">Class Page</div>
        </div>

        <div className="content">
          <SubCategories subCategories={subCategories} />

          <div className="classTab">
            <div className="labels">
              <div className="labelTitle">클래스 타이틀</div>
              <Search setSearch={setSearch} />
              <Sort />
            </div>
            <div className="classList">
              {filterSearch.map((list, i) => {
                const { title, summery, name, image_source } = list;
                return (
                  <div key={i} className="class">
                    <div className="picture">
                      <img alt="상품이미지" src={image_source} />
                    </div>
                    <div className="classTitle">{title}</div>
                    <div className="classLocation">{summery}</div>
                    <div className="classCredit">등대 : {name} </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
