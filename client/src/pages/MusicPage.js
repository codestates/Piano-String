import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get } from 'axios';
import MusicLinker from '../components/MusicLinker';
import appConfig from '../app.config';

// TODO: click button to copy link into clipboard
export default function MusicPage({ isNew = false }) {
  const { uuid } = useParams('uuid');
  const [music, setMusic] = useState({});
  useEffect(() => {
    get(`${appConfig.API_SERVER}/music/${uuid}`)
      .then((resp) => {
        setMusic(resp.data.content);
      });
  }, []);

  return (
    <div>
      {
        isNew
          ? <p>New music has been generated!</p>
          : null
      }
      <MusicLinker {...{ music, uuid }} />
    </div>
  );
}
