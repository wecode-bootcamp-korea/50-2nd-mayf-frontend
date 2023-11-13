import React from 'react';
import './Search.scss';

const Search = ({ setSearch }) => {
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="search">
      <input
        className="searchBox"
        type="text"
        placeholder="검색어를 입력하세요"
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Search;
