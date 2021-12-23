import axios from 'axios';
import { Redirect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hashPassword from '../utils/hashPassword';
import appConfig from '../app.config';

function SignInPage({ setUserState }) {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    id: '',
    pw: '',
  });

  const controlInput = key => (e) => {
    setUserInput({ ...userInput, [key]: e.target.value });
  };

  const onClickSignIn = () => {
    const { id, pw } = userInput;
    hashPassword(pw)
      .then((pwHash) => {
        axios.post(appConfig.API_SERVER + '/user/sign-in', {
          id,
          pw_hash: pwHash,
        })
        .then((res) => {
          setUserState({
            isSignedIn: true,
            accessToken: res.data.access_token,
            uuid: res.data.uuid,
          })
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
      <div className="SignInLogo">Login</div>
      <div>
        <div htmlFor="input_signin_id">ID</div>
        <input type="text" id="input_signin_id" onChange={controlInput('id')} />
      </div>
      <div>
        <div htmlFor="input_signin_password">Password</div>
        <input type="password" id="input_signin_password" onChange={controlInput('pw')} />
      </div>
      <div className="SignInBtnContainer">
        <button type="button" onClick={onClickSignIn}>SignIn</button>
        <button type="button">SignUp</button>
      </div>
    </div>
  );
}

export default SignInPage;
