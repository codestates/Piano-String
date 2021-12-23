const { useEffect, useState } = require('react');

export default function MusicPlayer({ music }) {
  const [player, _] = useState(new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus'));
  const [isPlaying, setIsPlaying] = useState(false);
  player.callbackObject = { run: () => {}, stop: () => { setIsPlaying(false) } };

  const controlPlayer = () => {
    switch (player.getPlayState()) {
      case 'stopped':
        player.start(music);
        break;
      case 'started':
        player.pause();
        break;
      case 'paused':
        player.resume();
        break;
    }
  }

  return (
    <div>
      { isPlaying
        ? <button type="button" onClick={() => { setIsPlaying(prev => false); controlPlayer(); }}>Pause</button>
        : <button type="button" onClick={() => { setIsPlaying(prev => true); controlPlayer(); }}>Play</button>
      }
    </div>
  );
}
