import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appConfig from '../app.config';
import HashTag from '../components/HashTag';

function articleWrite({params}) {
  const [writePost, setWritePost] = useState({
    title: '',
    article: '',
    music_uuid: '',
    tag: []
  })

  const navigate = useNavigate();

  const controlInputValue = key => (e) => {
    setWritePost({ ...writePost, [key]: e.target.value });
  };

  const onClickWrite = () => {
    axios.post(`${appConfig.API_SERVER}/article`,{
      title: writePost.title,
      article: writePost.article,
      music_uuid: writePost.music_uuid,
      tag: writePost.tag
    },{
      headers: { "Content-Type": "application/json" },
      withCredentials: true
      })
  }

  return (
    <div>
      <div className="titleWrapper">
        <input type="text" onChange={controlInputValue('title')} />
      </div>
      <div className="middleWrapper">
        <div className="musicWrapper">
          <button>generate</button>
          <div>{/* MusicPlayer */}</div>
        </div>
          <HashTag writePost={writePost} {...{ setWritePost }} />
      </div>
      <div className="contentWrapper">
        <input type="text" onChange={controlInputValue('content')} />
      </div>
      <div className="buttomWrapper">
        <button onClick={onClickWrite}>작성하기</button>
        <button onClick={() => navigate("/user")}>취소하기</button>
      </div>
    </div>
  )
}

export default articleWrite