import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sort from './components/Sort';
import Search from './components/Search';
import SubCategories from './components/SubCategories';
import { GET_LIST_API } from '../../config';
import './List.scss';

const List = () => {
  const [classList, setClassList] = useState({});
  const [filterSearch, setFilterSearch] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const location = useLocation();
  const queryString = location.search;
  // 검색어가 변경될 때마다 호출되는 콜백 함수
  const handleSearchChange = (search) => {
    if (!search) {
      // 검색어가 없는경우(!serach) 전체 리스트 표시
      setFilterSearch(classList.message || []);
    } else {
      // 검색어가 포함된 아이템만 필터링하는 변수 생성
      const filteredResults = classList.message.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.name.toLowerCase().includes(search.toLowerCase()),
      );
      setFilterSearch(filteredResults);
    }
  };

  //임시 목데이타 fetch
  // useEffect(() => {
  //   const fetchData = () => {
  //     fetch(`/data/listMockData.json${queryString}`, {
  //       method: 'GET',
  //     })
  //       .then((res) => res.json())
  //       .then((result) => {
  //         setSubCategories(result.message);
  //         setClassList(result);
  //         setFilterSearch(result.message || []);
  //       });
  //   };
  //   fetchData();
  // }, [queryString]);

  // 백엔드 통신 데이터
  useEffect(() => {
    const fetchData = () => {
      fetch(`${GET_LIST_API}${queryString}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((result) => {
          setSubCategories(result.message);
          setClassList(result);
          setFilterSearch(result.message || []);
        });
    };
    fetchData();
  }, [queryString]);

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
              <Search onSearchChange={handleSearchChange} />
              <Sort />
            </div>
            <div className="classList">
              {filterSearch.map((list) => {
                const { id, title, summery, name, image_source } = list;
                return (
                  <div key={id} className="class">
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
