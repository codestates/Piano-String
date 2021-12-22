import React, { useState } from 'react';
import ArticleListItem from './ArticleListItem';
import Pagination from './Pagination';

function articleListWrapper({ listData }) {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [postPerPage] = useState(10); // 페이지당 포스트 개수

  const indexOfLastpost = currentPage * postPerPage; // 1 * 10 = 10번 포스트
  const indexOfFristPost = indexOfLastpost - postPerPage; // 10 - 10 = 0 포스트
  const crrentPosts = listData.slice(indexOfFristPost, indexOfLastpost); // 0 - 10번까지 포스트

  const paginate = pageNum => setCurrentPage(pageNum);

  return (
    <div className="articleListWrapper">
      <div className="articleList">
        <div>공지사항</div>
        <span>글 번호</span>
        <span>글 제목</span>
        <span>작성일</span>
        <ul className="articleList">
          {crrentPosts.map(articleItemData => (
            <li key={articleItemData.uuid}>
              <ArticleListItem articleItemData={articleItemData} />
            </li>
          ))}
        </ul>
      </div>
      <nav className="pageNumber">
        <Pagination postPerPage={postPerPage} totalPosts={listData.length} paginate={paginate} />
      </nav>
    </div>
  );
}

export default articleListWrapper;
