import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import TopNavigation from './components/TopNavigation';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function App() {
  const [isLogin, setIsLogin] = useState(false)

  const controlLogin = () => {
    setIsLogin(!isLogin);
  }

  return (
    <div className="App">
      <TopNavigation controlLogin={controlLogin} isLogin={isLogin} />
      <Routes>
        <Route path="/">
          <Route index element="Hello World" />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
