import React from 'react';
import './CategoryList.scss';

const CategoryList = ({ categories }) => {
  // const uniqueTopCategories = Array.from(
  //   new Set(classList.message?.map((item) => item.top_category_name)),
  // );

  return (
    <div className="categoryList">
      <ul className="topCategory">
        {categories.map((category) => (
          <li key={category.id} className="categoryMenu">
            {category.top_category_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
