import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hashPassword from '../utils/hashPassword';
import appConfig from '../app.config';

function SignUpPage({ setUserState }) {
  const navigate = useNavigate();
  const [userInput, setuserInput] = useState({
    id: '',
    pw: '',
    name: '',
    pwCheck: '',
  });

  const controlInputValue = key => (e) => {
    setuserInput({ ...userInput, [key]: e.target.value });
  };

  const onClickSignUp = () => {
    const { id, pw, name, pwCheck } = userInput;

    if (!id || !pw || !name || !pwCheck) {
      console.log('모든 칸을 채워야 합니다');
      return;
    }

    if (pw !== pwCheck) { return; }

    hashPassword(pw)
      .then((pw_hash) => {
        axios.post(appConfig.API_SERVER + '/sign-up',{ id, pw_hash, name })
        .then(res => {
          setUserState({
            isSignedIn: true,
            access_token: res.data.access_token,
            info: { id, name },
          })
        })
        .then(() => { navigate('/'); })
      });
  }
      // TODO: exception handling

  return (
    <div className="SignUpContainer">
      <div className="SignUpLogo">회원가입</div>
      <div>
        <div>ID</div>
        <input type="text" placeholder="ID" onChange={controlInputValue('id')} />
      </div>
      <div>
        <div>Username</div>
        <input type="text" placeholder="Username" onChange={controlInputValue('name')} />
      </div>
      <div>
        <div>Password</div>
        <input type="password" placeholder="Password" onChange={controlInputValue('pw')} />
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
