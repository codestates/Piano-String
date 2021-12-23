import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleListWrapper from '../components/ArticleListWrapper';
import appConfig from '../app.config';

function announcementList({ userState }) {
  const navigate = useNavigate();
  const [listData, setListData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchUserPermission = () => {
    if (!userState.isSignedIn) { return }
    axios.get(`${appConfig.API_SERVER}/user/${userState.uuid}/permission`)
      .then((resp) => {
        setIsAdmin(resp.data);
      })
  }
  const fetchListData = () => {
    axios.get(`${appConfig.API_SERVER}/announcement`)
      .then((res) => {
        setListData([...res.data.data]);
      }).catch(e => console.log(e));
  };

  useEffect(() => {
    fetchUserPermission();
    fetchListData();
  }, []);

  return (
    <div>
      { isAdmin
        ? (
          <button type="button" onClick={() => navigate('write')}>작성하기</button>
        ) : null }
      <div className="articleListWrapper">
        { listData.length === 0
          ? <div>아직 작성된 글이 없습니다.</div>
          : <ArticleListWrapper base="announcement" listData={listData} />
        }
      </div>
    </div>
  );
}

export default announcementList;
