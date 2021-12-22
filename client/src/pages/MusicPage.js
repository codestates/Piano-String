import MusicPlayer from './MusicPlayer';
import { Link } from 'react-router-dom';

// TODO: click button to copy link into clipboard
export default function MusicPage({ isNew, music }) {
  return (
    <div>
      <MusicPlayer music={ music } />
      <p>
        <Link to={'.'}>Share</Link>
      </p>
    </div>
  )
}
