import React, { useState } from 'react';
import './Search.scss';

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState('');
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <div className="search">
      <input
        className="searchBox"
        type="text"
        placeholder="검색어를 입력하세요"
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Search;
