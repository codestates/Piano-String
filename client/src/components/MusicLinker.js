import { Link } from 'react-router-dom';
import MusicPlayer from './MusicPlayer';

// TODO: click button to copy link into clipboard
export default function MusicLinker({ uuid, music }) {
  const link = `/music/${uuid}`;

  return (
    <div>
      <MusicPlayer music={music} />
      <p>
        <Link to={link}>Share</Link>
      </p>
    </div>
  );
}
