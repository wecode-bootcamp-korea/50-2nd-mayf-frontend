import React from 'react';
import { BeatLoader } from 'react-spinners';
import './Spinner.scss';

const Spinner = () => {
  return (
    <div className="Spinner">
      <h3 className="text">로딩중입니다. 잠시만 기다려주세요.</h3>
      <BeatLoader />
    </div>
  );
};

export default Spinner;
