import React from 'react';
import './Pagination.scss';

const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];

  if (Math.ceil(totalItems / itemsPerPage) === 1) return null;

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <ul className="pagination">
      <button onClick={goToPrevPage} disabled={currentPage === 1}>
        {'<'}
      </button>
      {pageNumbers.map((num) => (
        // <li key={num} className="page-item">
        //   <a onClick={() => paginate(num)} href="/admin" className="page-link">
        //     {num}
        //   </a>
        // </li>
        <button key={num} onClick={() => paginate(num)} className="page-item">
          {num}
        </button>
      ))}
      <button
        onClick={goToNextPage}
        disabled={currentPage === pageNumbers.length}
      >
        {'>'}
      </button>
    </ul>
  );
};

export default Pagination;
