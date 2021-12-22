import React from 'react';

function Pagination({ postPerPage, totalPosts, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.cell(totalPosts / postPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map(num => (
        <li key={num}>
          <a onClick={() => paginate(num)} href="!#">{num}</a>
        </li>
      ))}
    </ul>
  );
}

export default Pagination;
