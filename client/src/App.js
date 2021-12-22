import './App.css';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import * as mm from '@magenta/music/es6';

global.mm = mm;

function App() {
  const [userState, setUserState] = useState({
    isSignedIn: false,
    accessToken: '',
    info: {},
  })

  const controlLogin = () => {
    setUserState(!userState.isSignedIn);
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element="Hello World" />
          <Route path="sign-in" element={<SignInPage {...{ setUserState }}/>} />
          <Route path="sign-up" element={<SignUpPage {...{ setUserState }}/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
