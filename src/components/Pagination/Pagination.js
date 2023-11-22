import React from 'react';
import './Pagination.scss';

const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const generatePageNumbers = () => {
    const middleRange = 2;
    let startPage = Math.max(currentPage - middleRange, 1);
    let endPage = Math.min(startPage + 4, totalPages);

    startPage = Math.max(endPage - 4, 1);

    return Array.from(
      { length: Math.min(5, totalPages) },
      (_, index) => startPage + index,
    );
  };

  const pageNumbers = generatePageNumbers();

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <ul className="pagination">
      <button onClick={() => paginate(1)} disabled={currentPage === 1}>
        {'<<'}
      </button>
      <button onClick={goToPrevPage} disabled={currentPage === 1}>
        {'<'}
      </button>
      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => paginate(num)}
          className={`pageItem ${currentPage === num ? 'active' : ''}`}
        >
          {num}
        </button>
      ))}
      <button onClick={goToNextPage} disabled={currentPage === totalPages}>
        {'>'}
      </button>
      <button
        onClick={() => paginate(totalPages)}
        disabled={currentPage === totalPages}
      >
        {'>>'}
      </button>
    </ul>
  );
};

export default Pagination;
