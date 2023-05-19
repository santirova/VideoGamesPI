import React from 'react';
import style from './Pagination.module.css';

export const Pagination = ({ totalPages, handleClick, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={style.paginationContainer}>
      {pageNumbers.map(number => (
        <button
          className={`${style.paginationButton} ${number === currentPage ? style.active : ''}`}
          key={number}
          onClick={() => handleClick(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
};