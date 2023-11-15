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

  console.log(subCategories);

  return (
    <div className="subcategories">
      <div className="tab">
        <div className="labelTitle class">클라스 카테고리</div>
        <ul className="categories">
          {subCategories.map((subName) => (
            <div key={subName}>
              <input
                onChange={() => handleSubFilter(subName)}
                checked={selectedSubCategory === subName}
                className={subName}
                type="radio"
                name={subName}
              />
              {subName}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubCategories;
