import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hashPassword from '../utils/hashPassword';
import appConfig from '../app.config';

function SignUpPage({ setUserState }) {
  const navigate = useNavigate();
  const [userInput, setuserInput] = useState({
    user_id: '',
    pw: '',
    name: '',
    pwCheck: '',
  });

  const controlInputValue = key => (e) => {
    setuserInput({ ...userInput, [key]: e.target.value });
  };

  const onClickSignUp = () => {
    const { user_id, pw, name, pwCheck } = userInput;

    if (!user_id || !pw || !name || !pwCheck) {
      console.log('모든 칸을 채워야 합니다');
      return;
    }

    if (pw !== pwCheck) { return; }

    hashPassword(pw)
      .then((pw_hash) => {
        axios.post(appConfig.API_SERVER + '/user/sign-up',{ user_id, pw_hash, name })
        .then(res => {
          setUserState({
            isSignedIn: true,
            accessToken: res.data.access_token,
            uuid: res.data.uuid,
          })
          axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`
        })
        .then(() => { navigate('/'); })
      });
  }
      // TODO: exception handling

  return (
    <div className="SignUpContainer">
      <div className="SignUpLogo">Join</div>
      <div>
        <div>ID</div>
        <input type="text" placeholder="ID" value={userInput.user_id} onChange={controlInputValue('user_id')} />
      </div>
      <div>
        <div>Username</div>
        <input type="text" placeholder="Username" value={userInput.name} onChange={controlInputValue('name')} />
      </div>
      <div>
        <div>Password</div>
        <input type="password" placeholder="Password" value={userInput.pw} onChange={controlInputValue('pw')} />
      </div>
      <div>
        <div>Password Check</div>
        <input type="password" placeholder="Password check" value={userInput.pwCheck} onChange={controlInputValue('pwCheck')} />
      </div>
      <div className="SignUpBtnContainer">
        <button type="button" onClick={onClickSignUp}>SignUp</button>
      </div>
    </div>

  );
}

export default SignUpPage;
