import './App.css';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import TopNavigation from './components/TopNavigation';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function App() {
  const [userState, setUserState] = useState({
    isSignedIn: false,
    accessToken: '',
    uuid: '',
    info: { userId: '', name: '' },
  })

  const controlLogin = () => {
    setUserState(!userState.isSignedIn);
  }
  const [isLogin, setIsLogin] = useState(false);

  const controlLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="App">
      <TopNavigation controlLogin={controlLogin} isLogin={isLogin} />
      <Routes>
        <Route path="/">
          <Route index element="Hello World" />
          <Route path="sign-in" element={<SignInPage {...{ setUserState }}/>} />
          <Route path="sign-up" element={<SignUpPage {...{ setUserState }}/>} />
          <Route path="user" element={<MyPage isLogin={isLogin} />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
