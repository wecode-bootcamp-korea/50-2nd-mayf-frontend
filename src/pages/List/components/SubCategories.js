import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

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
        <ul className="categories">
          {subCategories.map(({ name }) => (
            <div key={name}>
              <input
                onChange={() => handleSubFilter(name)}
                checked={selectedSubCategory === name}
                className={name}
                type="radio"
                name={name}
              />
              {name}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubCategories;
