import axios from 'axios';
import React, { useState, useEffect } from 'react';
import UserInfoViewer from '../components/UserInfoViewer';
import ExpireModal from '../components/ExpireModal';
import appConfig from '../app.config';
import { useNavigate } from 'react-router-dom';
import ArticleListWrapper from '../components/ArticleListWrapper';

function myPage({ userState, onClickSignOut }) {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({ userId: '', name: '' })
  const [articleList, setArticleList] = useState([]);

  const fetchUserInfo = () => {
    axios.get(`${appConfig.API_SERVER}/user/${userState.uuid}`)
      .then((resp) => {
        // console.log(resp.data.data);
        setUserInfo({
          userId: resp.data.data.user_id,
          name: resp.data.data.name,
        });
      });
  };

  const fetchArticleList = () => {
    // console.log('Fetching article list');
    axios.get(`${appConfig.API_SERVER}/article`)
      .then((resp) => {
        setArticleList(prev => resp.data.data);
      });
  }

  const handleResign = () => {
    axios.delete(
      `${appConfig.API_SERVER}/user/${userState.uuid}`,
    ).then((resp) => {
      onClickSignOut();
    })
    // TODO: exception handling
  }

  const controlExpireModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    fetchUserInfo();
    fetchArticleList();
  }, []);


  // return (
  //   <div>
  //     <p>Info</p>
  //     { articleList.length
  //       ? <ArticleListWrapper listData={articleList} />
  //       : null
  //     }
  //   </div>
  // )

  // TODO: if not signed in, use modal and redirect to sign-in page.
  return (
    <div>
      { userState.isSignedIn
          ? <div className="mypageContainer">
              <div className="infoContainer">
                <UserInfoViewer {...{setIsModalVisible, uuid: userState.uuid, userInfo}} />
                {/* <button type="button">작성하기</button> */}
              </div>
              <div className="articleListContainer">
                <ArticleListWrapper base='article' listData={articleList} />
              </div>
              <ExpireModal {...{handleResign, isModalVisible, setIsModalVisible}} />
            </div>
          : <div className="textContainer">로그인이 필요합니다.</div>
      }
    </div>
  );

}

export default myPage;
