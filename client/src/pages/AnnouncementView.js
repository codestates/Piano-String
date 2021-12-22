import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appConfig from '../app.config';

function announcementView({ userState, announcementUUID }) {
  const navigate = useNavigate();
  const [announcementInfo, setAnnouncementInfo] = useState({
    announcement: '',
    title: '',
    content: '',
    createAt: '',
  });

  const handleAnnouncement = () => {
    axios.get(`${appConfig.API_SERVER}/announcement/${announcementUUID}`)
      .then((res) => {
        setAnnouncementInfo({
          announcement: res.data.announcement,
          title: res.data.title,
          content: res.data.content,
          createAt: res.data.createAt,
        });
      });
  };

  useEffect(() => {
    handleAnnouncement();
  }, []);

  const onClickDelete = () => {
    axios.delete(`${appConfig.API_SERVER}/announcement/${announcementUUID}`)
      .then(() => navigate('/announcementList'));
  };

  return (
    <div>
      <div className="articleViewWrapper">
        <div className="articleTitleWraper">
          <sapn className="articleNumber">{announcementInfo.announcement}</sapn>
          <span className="articleTitle">{announcementInfo.title}</span>
          <span className="articleCreateAt">{announcementInfo.createAt}</span>
        </div>
        <div className="articleContent">{announcementInfo.content}</div>
      </div>
      {userState.info.isAdmin
        ? (
          <div className="buttonWrapper">
            <button type="button" onClick={() => { navigate('/announcementWrite'); }}>수정하기</button>
            <button type="button" onClick={onClickDelete}>삭제하기</button>
          </div>
        )
        : (
          <div className="buttonWrapper">
            <button type="button" onClick={() => { navigate('/announcementList'); }}>목록으로</button>
          </div>
        )}
    </div>
  );
}

export default announcementView;
