import axios from 'axios';
import React, { useState, useEffect } from 'react';
import UserInfoViewer from '../components/UserInfo';
import ExpireModal from '../components/ExpireModal';

function myPage({ isLogin }) {
  const [updateInfo, setUpdateInfo] = useState(false);
  const [controlModal, setControlModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    user_id: '',
    name: '',
    createAt: '',
  });
  const API_SERVER = '';

  const getUserInfo = () => {
    axios.get(API_SERVER)
      .then((res) => {
        setUserInfo({
          user_id: res.data.user_id,
          name: res.data.name,
          createAt: res.data.createAt,
        });
      });
  };

  const controlUpdateInfo = () => {
    setUpdateInfo(!updateInfo);
  };

  const controlExpireModal = () => {
    setControlModal(!controlModal);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      {isLogin
        ? (
          <div className="mypageContainer">
            <div className="infoContainer">
              <UserInfoViewer controlUpdateInfo={controlUpdateInfo} updateInfo={updateInfo} userInfo={userInfo} />
              <button type="button">작성하기</button>
              <button type="button" onClick={controlUpdateInfo}>수정하기</button>
              <button type="button" onClick={controlExpireModal}>탈퇴하기</button>
            </div>
            <div className="articleListContainer">
              <div>articleListContainer</div>
            </div>
            <ExpireModal controlExpireModal={controlExpireModal} controlModal={controlModal} />
          </div>
        )
        : (<div>로그인이 필요합니다.</div>)}
    </div>
  );
}

export default myPage;
