import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MusicPlayer from '../components/MusicPlayer';
import appConfig from '../app.config';

function ArticleView() {
  const navigate = useNavigate();

  const { uuid } = useParams();
  // console.log('uuid', uuid);

  const [article, setArticle] = useState({
    title: '',
    content: '',
    musicTitle: '',
    musicContent: {},
    createdAt: '',
    tag: [],
  })


  const fetchArticle = () => {
    // console.log('!!!');
    axios.get(`/article/${uuid}`)
      .then((res) => {
        const {
          title,
          content,
          music_title: musicTitle,
          music_content: musicContent,
          created_at: createdAt,
          tag,
        } = res.data.data;
        console.log(title, content, musicTitle, createdAt, tag);
        setArticle(prev => ({ title, content, musicTitle, musicContent, createdAt, tag }));
      })
  }

  const onClickDelete = () => {
    axios.delete(`/article/${uuid}`)
    .then(() => {
      navigate('/user')
    })
  }

  useEffect(() => {
    fetchArticle();
  }, []);

  return (
    <div className="articleWrapper">
      <div className="titleWrapper">
        <div className="articleTitle">{article.title}</div>
        <div className="articleCreateAt">{article.createdAt}</div>
      </div>
      <div className="middleWrapper">
        <div className="musicWrapper">
          <MusicPlayer music={article.musicContent} />
        </div>
        <div className="HashWrap">
          <div className="HashWrapOuter">
            { article.tag.map(tag => (<div className="HashWrapInner">#{tag}</div>)) }
          </div>
        </div>
      </div>
      <div className="articleContent">
        <div>{article.content}</div>
      </div>
      <div className="buttomWrapper">
        <button onClick={() => navigate(`/article/edit/${uuid}`)}>수정하기</button>
        <button onClick={onClickDelete}>삭제하기</button>
      </div>
    </div>
  )

}

export default ArticleView
