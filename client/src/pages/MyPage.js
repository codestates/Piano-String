import axios from 'axios';
import React, { useState, useEffect } from 'react';
import UserInfoViewer from '../components/UserInfoViewer';
import ExpireModal from '../components/ExpireModal';
import appConfig from '../app.config';
import { useNavigate } from 'react-router-dom';

function myPage({ userState }) {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getUserInfo = () => {
    axios.get(`${appConfig.API_SERVER}/user/${userState.uuid}`)
      .then((res) => {
        setUserInfo({
          userId: res.data.user_id,
          name: res.data.name,
          createdAt: res.data.createdAt,
        });
      });
  };

  const handleResign = () => {
    axios.delete(
      `${appConfig.SERVER_API}/user/${userState.uuid}`,
      { headers: { Authorization: `Bearer ${userState.accessToken}` } }
    ).then((resp) => {
      useNavigate()('/');
    })
    // TODO: exception handling
  }

  const controlExpireModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  // TODO: if not signed in, use modal and redirect to sign-in page.
  return (
    <div>
      { userState.isSignedIn
        ? (
          <div className="mypageContainer">
            <div className="infoContainer">
              <UserInfoViewer {...{setIsModalVisible, userState}} />
              <button type="button">작성하기</button>
            </div>
            <div className="articleListContainer">
              <div>articleListContainer</div>
            </div>
            <ExpireModal {...{handleResign, isModalVisible, setIsModalVisible}} />
          </div>
        )
        : (<div>로그인이 필요합니다.</div>)}
    </div>
  );
}

export default myPage;
