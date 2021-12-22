import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ArticleListWrapper from '../components/ArticleListWrapper';
import appConfig from '../app.config';

function announcementList({ userState }) {
  const [listData, setListData] = useState({ data: [] });

  const fetchListData = () => {
    axios.get(`${appConfig.API_SERVER}/announcement`)
      .then((res) => {
        setListData({ data: [...res.data.announcement_list] });
      });
  };

  useEffect(() => {
    fetchListData();
  }, []);

  return (
    <div>
      {userState.info.isAdmin
        ? (
          <button type="button">작성하기</button>
        ) : null }
      <div className="articleListWrapper">
        {data.length === 0
          ? (
            <div>아직 작성된 글이 없습니다.</div>
          ) : (
            <ArticleListWrapper listData={listData} />
          )}
      </div>
    </div>
  );
}

export default announcementList;
