import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './SubCategories.scss';

const SubCategories = ({ subCategories }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedSubCategory, setSelectedSubCategory] = useState(
    searchParams.get('subCategoryName'),
  );

  const handleSubFilter = (subCategory) => {
    setSelectedSubCategory(subCategory);
    searchParams.set('subCategoryName', subCategory);
    setSearchParams(searchParams);
  };

  return (
    <div className="subcategories">
      <div className="tab">
        <div className="labelTitle class">클라스 카테고리</div>
        <div className="categories">
          {subCategories.map(({ name }) => (
            <div className="categoriesBox" key={name}>
              <input
                onChange={() => handleSubFilter(name)}
                checked={selectedSubCategory === name}
                className="radioBtn"
                type="radio"
                name={name}
              />
              <label htmlFor={name} className="categoriesName">
                {name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCategories;
