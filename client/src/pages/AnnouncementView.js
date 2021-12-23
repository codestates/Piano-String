import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import appConfig from '../app.config';

function announcementView({ userState }) {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [announcement, setAnnouncement] = useState({
    title: '',
    content: '',
    created_at: '',
  });
  const { uuid } = useParams();

  const fetchUserPermission = () => {
    if (!userState.isSignedIn) { return }
    axios.get(
      `${appConfig.API_SERVER}/user/${userState.uuid}/permission`,
    )
      .then((resp) => {
        setIsAdmin(resp.data);
      })
  }

  const handleAnnouncement = () => {
    axios.get(`${appConfig.API_SERVER}/announcement/${uuid}`)
      .then((res) => {
        setAnnouncement(res.data.data);
      }).catch(e => console.log(e));
  };

  useEffect(() => {
    fetchUserPermission();
    handleAnnouncement();
  }, []);

  const onClickDelete = () => {
    axios.delete(
      `${appConfig.API_SERVER}/announcement/${uuid}`,
    )
      .then(() => navigate('/announcement'));
  };

  return (
    <div>
      <div className="articleViewWrapper">
        <div className="articleTitleWraper">
          <span className="articleTitle">{announcement.title}</span>
          <span className="articleCreatedAt">{announcement.created_at}</span>
        </div>
        <div className="articleContent">{announcement.content}</div>
      </div>
      { isAdmin
          ? (
            <div className="buttonWrapper">
              <button type="button" onClick={() => { navigate(`/announcement/edit/${uuid}`); }}>수정하기</button>
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
