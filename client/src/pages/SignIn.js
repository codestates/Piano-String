import axios from 'axios';
import { Redirect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hashPassword from '../utils/hashPassword';
import appConfig from '../app.config';

function SignInPage({ setUserState }) {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    user_id: '',
    pw: '',
  });

  const controlInput = key => (e) => {
    setUserInput({ ...userInput, [key]: e.target.value });
  };

  const onClickSignIn = () => {
    const { user_id, pw } = userInput;
    hashPassword(pw)
      .then((pwHash) => {
        axios.post(
          '/user/sign-in',
          {
            user_id,
            pw_hash: pwHash,
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(({ data: { uuid, access_token: accessToken } }) => {
          setUserState({
            isSignedIn: true,
            accessToken,
            uuid,
          })
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        })
        .then(() => {
          navigate('/');
        })
        // TODO: exception handling
      })
      .catch((err) => { console.log(err) })
  };

  return (
    <div className="SignInContainer">
      <div className="SignInLogo">로그인</div>
      <div>
        <label htmlFor="input_signin_id">ID</label>
        <input type="text" id="input_signin_id" value={userInput.user_id} onChange={controlInput('user_id')} />
      </div>
      <div>
        <label htmlFor="input_signin_password">Password</label>
        <input type="password" id="input_signin_password" value={userInput.pw} onChange={controlInput('pw')} />
      </div>
      <div className="SignInBtnContainer">
        <button type="button" onClick={onClickSignIn}>SignIn</button>
        <button type="button">SignUp</button>
      </div>
    </div>
  );
}

export default SignInPage;
