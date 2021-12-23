import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import appConfig from '../app.config';

function announcementWrite() {
  const [writeData, setWriteData] = useState({
    title: '',
    content: '',
  });
  const navigate = useNavigate();
  const { uuid } = useParams();

  const onClickWrite = () => {
    (uuid ? axios.patch : axios.post)(
      `${appConfig.API_SERVER}/announcement/${uuid || ''}`,
      {
        title: writeData.title,
        content: writeData.content,
      },
    )
      .then(resp => {
        console.log('WRITE');
        navigate('/announcement');
      });
  };

  const controlInputValue = key => (e) => {
    setWriteData({ ...writeData, [key]: e.target.value });
  };

  useEffect(() => {
    if (uuid) {
      axios.get(`${appConfig.API_SERVER}/announcement/${uuid}`)
        .then(resp => {
          setWriteData(resp.data.data);
        })
    }
  }, []);

  return (
    // TODO: uuid가 리스트안에 존재하면 그 데이터를 가져온다(수정하기), 없다면 새로작성
    <div className="articleBody">
      <div className="articleWritetWrapper">
        <div className="inputTitle">
          <input type="text" value={writeData.title} onChange={controlInputValue('title') } />
        </div>
        <div className="inputContent">
          <textarea type="text" value={writeData.content} onChange={controlInputValue('content')} />
        </div>
      </div>
      <div className="buttonWrapper">
        <button type="button" onClick={onClickWrite}>작성하기</button>
      </div>
    </div>
  );
}

export default announcementWrite;
