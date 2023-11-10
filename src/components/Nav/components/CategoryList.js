import React from 'react';
import './CategoryList.scss';

const CategoryList = ({ categories }) => {
  return (
    <div className="categoryList">
      <ul className="topCategory">
        {categories.map((category) => (
          <li key={category.id} className="categoryMenu">
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
