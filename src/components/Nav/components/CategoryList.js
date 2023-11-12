import React from 'react';
import './CategoryList.scss';

const CategoryList = ({ categories }) => {
  const uniqueCategories = Array.from(
    new Set(categories.map((category) => category.top_category_name)),
  );

  return (
    <div className="categoryList">
      <ul className="topCategory">
        {uniqueCategories.map((categoryName) => (
          <li key={categoryName} className="categoryMenu">
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
