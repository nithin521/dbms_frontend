
import React, { useState } from 'react';
import './Pagination.css';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const [activePage, setActivePage] = useState(currentPage);

  const handlePageChange = (page) => {
    setActivePage(page);
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={i === activePage ? "active" : ""}
          >
            {i}
          </button>
        );
      }
    } else {
      const startPage = Math.max(
        1,
        activePage - Math.floor(maxPagesToShow / 2)
      );
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={i === activePage ? "active" : "button"}
          >
            {i}
          </button>
        );
      }
    }

    return pageNumbers;
  };


  return (
    <div className="pagination-container">
      <button onClick={() => handlePageChange(1)} disabled={activePage === 1} className='pageBtn'>
        First
      </button>
      <button
        onClick={() => handlePageChange(activePage - 1)}
        disabled={activePage === 1} className='pageBtn'
      >
        Prev
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(activePage + 1)}
        disabled={activePage === totalPages} className='pageBtn'
      >
        Next
      </button>
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={activePage === totalPages} className='pageBtn'
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
