import { useState } from 'react';
import { post } from 'axios';

import appConfig from '../app.config';
import generateMusic from '../utils/generateMusic';

export default function MusicGenerator({ setHomeData }) {
  const [userInput, setUserInput] = useState('');
  const controlInput = (e) => {
    setUserInput(e.target.value);
  }

  const onClickGenerate = () => {
    console.log('Generating music')
    musicVAE.sample(1, 1.5)
      .then(([music]) => {
        setHomeData({ isNew: true, music })
      })
    // post(`${appConfig.API_SERVER}/music`)
    // .then((resp) => {
    // })
  }

  return (
    <div>
      <input type="text" value={userInput} onChange={controlInput} placeholder="Insert text here" />
      <button type="button" onClick={onClickGenerate}>Generate</button>
    </div>
  )

}
