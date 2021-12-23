import React, { useState } from 'react';
import ArticleListItem from './ArticleListItem';
import Pagination from './Pagination';

function articleListWrapper({ base, listData }) {

  return (
    <div className="articleListWrapper">
      <div className="articleList">
        <span>글 제목</span>
        <span>작성일</span>
      </div>
        <ul className="articleListUl">
          {listData.map(article => (
            <li className="articleTitle" key={article.uuid}>
              <ArticleListItem {...{ base, ...article }} />
            </li>
          ))}
        </ul>
    </div>
  );
}

export default articleListWrapper;
