import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryList.scss';

const CATEGORIES = [
  '운동',
  '예술',
  '공예',
  '외국어',
  '요리',
  '게임',
  '프로그래밍',
  '기타',
];

const CategoryList = () => {
  const navigate = useNavigate();
  const handleCategoryClick = (categoryName) => {
    navigate(`/list?topCategoryName=${categoryName}`);
  };

  return (
    <div className="categoryList">
      <ul className="topCategory">
        {CATEGORIES.map((categoryName) => (
          <li
            key={categoryName}
            className="categoryMenu"
            onClick={() => handleCategoryClick(categoryName)}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
