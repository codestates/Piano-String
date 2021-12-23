import './App.css';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import AnnouncementList from './pages/AnnouncementPage';
import AnnouncementView from './pages/AnnouncementView';
import AnnouncementWrite from './pages/AnnouncementWrite';
import ArticleWrite from './pages/ArticleWrite';
import ArticleView from './pages/ArticleView';
import TopNavigation from './components/TopNavigation';
import Footer from './components/Footer';
import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import appConfig from './app.config';
import MyPage from './pages/MyPage';
import MusicPage from './pages/MusicPage';
import Home from './pages/Home';

const initialUserState = {
  isSignedIn: false,
  accessToken: '',
  uuid: '',
}

axios.defaults.withCredentials = true;
axios.defaults.baseURL = appConfig.API_SERVER;

function App() {
  const navigate = useNavigate();
  const [userState, setUserState] = useState({...initialUserState})
  const [refreshFailed, setRefreshFailed] = useState(false);

  const silentRefresh = () => {
     axios.get('/auth')
       .then(resp => {
         if (resp.status === 400) {
           console.log('400!!!!!');
           return;
         }
         axios.defaults.headers.common['Authorization'] = `Bearer ${resp.data.access_token}`;
         console.log('default headers set');
         setUserState(prev => ({
           isSignedIn: true,
           accessToken: resp.data.access_token,
           uuid: resp.data.uuid,
         }));
       }).catch(e => { console.log(e) });
  }

  const onClickSignOut = () => {
    axios.post(`/user/sign-out`, {})
      .then(resp => {
        delete axios.defaults.headers.common['Authorization'];
        setUserState({...initialUserState});
      })
      .then(() => {
        navigate('/');
      })
  }

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

  useEffect(() => {
    if (!userState.isSignedIn && !refreshFailed) {
      silentRefresh();
    }
  }, []);

  return (
    <div className="App">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Gugi&display=swap" rel="stylesheet"></link>
      <TopNavigation {...{ userState, onClickSignOut }} />
      <div className="bodyWrapper">
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="sign-in" element={<SignInPage {...{ setUserState }}/>} />
          <Route path="sign-up" element={<SignUpPage {...{ setUserState }}/>} />
          <Route path="announcement" element={<AnnouncementList userState={ userState } />} />
          <Route path="announcement/:uuid" element={<AnnouncementView userState={ userState } />} />
          <Route path="announcement/write" element={<AnnouncementWrite />} />
          <Route path="announcement/edit/:uuid" element={<AnnouncementWrite />} />
          <Route path="user" element={<MyPage {...{userState, onClickSignOut}} />} />
          <Route path="article/write" element={<ArticleWrite />} />
          <Route path="article/edit/:uuid" element={<ArticleWrite />} />
          <Route path="article/:uuid" element={<ArticleView />} />
          <Route path="music/:uuid" element={<MusicPage />} />
        </Route>
      </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
