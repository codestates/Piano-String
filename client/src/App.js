import './App.css';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import TopNavigation from './components/TopNavigation';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import appConfig from './app.config';
import MyPage from './pages/MyPage';
import * as mm from '@magenta/music/es6';
import MusicPage from './pages/MusicPage';
import Home from './pages/Home';

global.mm = mm;
global.musicVAE = new mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_small_q2');
musicVAE.initialize();

function App() {
  const [userState, setUserState] = useState({
    isSignedIn: true,
    accessToken: '',
    uuid: '',
    info: { userId: '', name: '' },
  })

  const handleSignIn = ({ uuid, accessToken }) => {
    setUserState(prev => ({ ...prev, uuid, accessToken }), () => {
      axios.get(`${appConfig.API_SERVER}/user/${uuid}`)
        .then((res) => {
          if (res.status === 200) {
            setUserState(prev => ({
              ...prev,
              info: {
                userId: res.data.user_id,
                name: res.data.name,
              },
            }));
          }
        })
    })
  }

  return (
    <div className="App">
      <TopNavigation {...{userState}} />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="sign-in" element={<SignInPage {...{ setUserState }}/>} />
          <Route path="sign-up" element={<SignUpPage {...{ setUserState }}/>} />
          <Route path="user" element={<MyPage userState={userState} />} />
          <Route path="music/:uuid" element={<MusicPage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
