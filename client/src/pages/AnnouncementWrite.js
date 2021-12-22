import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appConfig from '../app.config';

function announcementWrite({ announcementUUID }) {
  const [writeData, setWriteData] = useState({
    title: '',
    content: '',
  });
  const navigate = useNavigate();

  const onClickWrite = () => {
    axios.post(`${appConfig.API_SERVER}/announcement`, {
      title: writeData.title,
      content: writeData.content,
    })
      .then();
  };

  const controlInputValue = key => (e) => {
    setWriteData({ ...writeData, [key]: e.target.value });
  };

  useEffect(() => {
    if (announcementUUID !== undefined) {
      axios.get(`${appConfig.API_SERVER}/announcement/${announcementUUID}`)
        .then((res) => {
          setWriteData({
            title: res.data.title,
            content: res.data.content,
          });
        })
        .then(() => {
          axios.patch(`${appConfig.API_SERVER}/announcement/${announcementUUID}`, {
            title: writeData.title,
            content: writeData.content,
          })
            .then(() => { navigate('/announcementList'); });
        })
        .catch(err => console.log(err));
    }
  }, []);

  return (
    // TODO: uuid가 리스트안에 존재하면 그 데이터를 가져온다(수정하기), 없다면 새로작성
    <div>
      <div className="articleWritetWrapper">
        <div className="inputTitle">
          <input type="text" onChange={controlInputValue('title')} />
        </div>
        <div className="inputContent">
          <input type="text" onChange={controlInputValue('content')} />
        </div>
      </div>
      <div className="buttonWrapper">
        <button type="button" onClick={onClickWrite}>작성하기</button>
      </div>
    </div>
  );
}

export default announcementWrite;
