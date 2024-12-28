import React from "react";
import { PaginationProps } from "../../types/common";

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handleNextClick = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  return (
    <div className="pagination-controls">
      <button
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        &larr; Previous
      </button>
      <button className="pagination-button"> {currentPage}</button>
      <button
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Next &rarr;
      </button>
    </div>
  );
};
