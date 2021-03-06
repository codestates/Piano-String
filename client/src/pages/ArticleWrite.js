import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import appConfig from '../app.config';
import HashTag from '../components/HashTag';
import MusicPlayer from '../components/MusicPlayer';

function ArticleWrite() {
  const { uuid } = useParams();
  const [article, setArticle] = useState({
    title: '',
    content: '',
    music_content: null,
    tag: [],
  })
  const [tagList, setTagList] = useState([]);

  const navigate = useNavigate();

  const controlInputValue = key => (e) => {
    setArticle({ ...article, [key]: e.target.value });
  };

  const fetchArticle = () => {
    axios.get(`/article/${uuid}`)
      .then((res) => {
        setArticle(prev => ({...prev, ...res.data.data}));
      })
  }

  const onClickWrite = () => {

    const data = {
      title: article.title,
      content: article.content,
      music: article.music_content,
      tag: tagList,
    }

    console.log(data);

    (uuid ? axios.patch : axios.post)(`/article/${uuid || ''}`, data)
      .then((resp) => { navigate(`/article/${uuid || resp.data.uuid}`) })
  }

  const generateMusic = () => {
    musicVAE.sample(1, 1.5)
      .then(([music_content]) => {
        setArticle(prev => ({ ...prev, music_content }))
      })
  }

  useEffect(() => {
    if (uuid) { fetchArticle(); }
  }, [])

  return (
    <div className="articleBody">
      <div className="articleWriteWrap">
        <div className="titleWrapper">
          <input type="text" value={article.title} onChange={controlInputValue('title')} />
        </div>
        <div className="middleWrapper">
          <div className="musicWrapper">
            <button onClick={generateMusic}>Generate music</button>
            { article.music_content
              ? <MusicPlayer music={article.music_content}/>
              : null
            }
          </div>
            { uuid
              ?
                <div className="HashWrap">
                  <div className="HashWrapOuter">
                    { article.tag.map(tag => (<div className="HashWrapInner">#{tag}</div>))}
                  </div>
                </div>
              : <HashTag {...{ article, setArticle, tagList, setTagList }} />
            }
        </div>
        <div className="contentWrapper">
          <textarea type="text" value={article.content} onChange={controlInputValue('content')} />
        </div>
        <div className="buttomWrapper">
          <button onClick={onClickWrite}>????????????</button>
          <button onClick={() => navigate("/user")}>????????????</button>
        </div>
      </div>
    </div>
  )
}

export default ArticleWrite
