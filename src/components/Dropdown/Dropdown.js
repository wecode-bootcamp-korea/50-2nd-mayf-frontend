import React, { useRef } from 'react';
import useOutsideClick from './useOutsideClick'; // useOutsideClick 파일의 경로에 맞게 수정

const Dropdown = ({ children, onClose }) => {
  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, onClose);

  return <div ref={dropdownRef}>{children}</div>;
};

export default Dropdown;
