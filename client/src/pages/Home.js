import { useState } from 'react';

import MusicGenerator from '../components/MusicGenerator';
import MusicPlayer from '../components/MusicPlayer';

export function Home() {
  const [homeData, setHomeData] = useState({ isNew: false, music: {} });

  return (
    <div className ="mainMusic">
      <h1>Piano string</h1>
      <p>Generate random music from text</p>
      {
        homeData.isNew
          ? <MusicPlayer music={homeData.music} />
          : <MusicGenerator setHomeData={setHomeData}/>
      }
    </div>
  )
}

export default Home;
