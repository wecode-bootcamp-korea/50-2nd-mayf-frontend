import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryList.scss';

const CategoryList = ({ categories }) => {
  const navigate = useNavigate();
  const handleCategoryClick = (categoryName) => {
    navigate(`/list?topCategoryName=${categoryName}`);
  };

  const uniqueCategories = Array.from(
    new Set(categories.map((category) => category.top_category_name)),
  );

  return (
    <div className="categoryList">
      <ul className="topCategory">
        {uniqueCategories.map((categoryName) => (
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
