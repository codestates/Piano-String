import './App.css';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import AnnouncementList from './pages/AnnouncementPage';
import AnnouncementView from './pages/AnnouncementView';
import AnnouncementWrite from './pages/AnnouncementWrite';
import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

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
          <Route path="announcementList" element={<AnnouncementList userState={ userState } />} />
          <Route path="announcementView" element={<AnnouncementView userState={ userState } announcementUUID={ announcementUUID } />} />
          <Route path="announcementWrite" element={<AnnouncementWrite announcementUUID={ announcementUUID } />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
