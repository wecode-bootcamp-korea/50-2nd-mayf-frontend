import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SubCategories = ({ subCategories }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  //sub카테고리 중복 제거
  const uniqueSubCategories = Array.from(
    new Set(subCategories.map((name) => name.sub_category_name)),
  );

  const handleSubilter = (subCategory) => {
    searchParams.set('subCategories', subCategory);
    setSearchParams(searchParams);
  };
  const getSearchParams = searchParams.get('subCategories');
  return (
    <div className="subcategories">
      <div className="tab">
        <div className="labelTitle class">클라스 카테고리</div>
        <ul className="categories">
          {uniqueSubCategories.map((subName) => (
            <div key={subName}>
              <input
                onChange={() => handleSubilter(subName)}
                value={getSearchParams}
                className={subName}
                type="checkbox"
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
