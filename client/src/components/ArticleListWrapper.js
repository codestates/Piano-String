import React, { useState } from 'react';
import ArticleListItem from './ArticleListItem';
import Pagination from './Pagination';

function articleListWrapper({ base, listData }) {

  return (
    <div className="articleListWrapper">
      <div className="articleList">
        <span>글 번호</span>
        <span>글 제목</span>
        <span>작성일</span>
        <ul className="articleList">
          {listData.map(article => (
            <li key={article.uuid}>
              <ArticleListItem {...{ base, ...article }} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default articleListWrapper;
