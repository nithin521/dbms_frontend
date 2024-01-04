import React, { useState, useEffect } from "react";
import Books from "./Books";
import Pagination from "../Pagination/Pagination";

const BookComponent = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(20); // Adjust this based on your preference

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = data?.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(data?.length / booksPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);


  return (
    <div>
      <div className="books">
        {currentBooks?.map((ele, index) => (
          <Books key={index} data={ele} />
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BookComponent;
