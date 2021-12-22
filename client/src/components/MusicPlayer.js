export default function MusicPlayer({ music }) {
  const player = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');
  player.callbaclObject = { run: () => {}, stop: () => console.log('done') };
  return (
    <div>
      <button type="button" onClick={() => { player.start(music); }}>Play</button>
    </div>
  );
}
