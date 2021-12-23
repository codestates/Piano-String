import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
    createdAt: ''
  })


  const fetchArticle = () => {
    // console.log('!!!');
    axios.get(`/article/${uuid}`)
      .then((res) => {
        // console.log(res.data);
        setArticle(res.data.data)
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

  // console.log(article);
  return (
    <div>
      <div className="titleWrapper">
        <div className="articleTitle">{article.title}</div>
        <div className="articleCreateAt">{article.createdAt}</div>
      </div>
      <div className="middleWrapper">
        <div className="musicWrapper">
          <div>{/* MusicPlayer */}</div>
        </div>
        <div>Hashtag</div>
      </div>
      <div className="contentWrapper">
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
