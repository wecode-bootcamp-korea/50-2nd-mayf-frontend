import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './Sort.scss';

const Sort = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const FILTER = [
    { id: 1, text: '전체', value: '' },
    { id: 2, text: '최신순', value: 'newest' },
    { id: 3, text: '인기순', value: 'salesDesc' },
  ];

  // const handleFilter = (value) => {
  //   searchParams.set('sortBy', value);
  //   setSearchParams(searchParams);
  // };

  const handleFilter = (value) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('sortBy', value);
    setSearchParams(newSearchParams);
  };

  return (
    <div className="sort">
      <div className="selectBox">
        <select
          onChange={(e) => handleFilter(e.target.value)}
          value={searchParams.get('sortBy')}
        >
          {FILTER.map((filter) => {
            return (
              <option value={filter.value} className="sortBy" key={filter.id}>
                {filter.text}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Sort;
