import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appConfig from '../app.config';
import HashTag from '../components/HashTag';

function articleView(params) {
  const [articleData, setArticleData] = useState({
    title: '',
    content: '',
    musicTitle: '',
    musicContent: '',
    createdAt: ''
  })
  const articleUUID = '123123'

  const navigate = useNavigate();

  const handleArticle = () => {
    axios.get(`${appConfig.API_SERVER}/article/${articleUUID}`)
    .then((res) => {
      setArticleData({
        title: res.data.title,
        content: res.data.content,
        musicTitle: res.data.music_title,
        musicContent: res.data.music_content,
        createdAt: res.data.createdAt
      })
    })
  }

  const onClickDelete = () => {
    axios.delete(`${appConfig.API_SERVER}/article/${articleUUID}`)
    .then(() => {
      navigator('/user')
    })
  }

  useEffect(() => {
    handleArticle();
  }, []);

  return (
    <div>
      <div className="titleWrapper">
        <div className="articleNumber">{articleUUID}</div>
        <div className="articleTitle">{articleData.title}</div>
        <div className="articleCreateAt">{articleData.createdAt}</div>
      </div>
      <div className="middleWrapper">
        <div className="musicWrapper">
          <button>generate</button>
          <div>{/* MusicPlayer */}</div>
        </div>
        <div>Hashtag</div>
      </div>
      <div className="contentWrapper">
        <div>{articleData.content}</div>
      </div>
      <div className="buttomWrapper">
        <button onClick={() => navigate('/articleWrite')}>수정하기</button>
        <button onClick={onClickDelete}>삭제하기</button>
      </div>
    </div>
  )
}

export default articleView
