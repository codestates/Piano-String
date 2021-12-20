import axios from 'axios';
import React, { useState } from 'react';

function SignInPage() {
  const [userInput, setUserInput] = useState({
    id: '',
    pw: ''
  });
  // TODO: dotenv
  const API_SERVER = '';

  const controlInput = (key) => (e) => {
    setUserInput({ ...userInput, [key]: e.target.value});
  };

  // const controlInputPw = (e) => {
  //   setInputPw(e.target.value);
  // };

  const onClickSignIn = () => {
    const {id, pw} = userInput
    // TODO: 비밀번호 해쉬화 작성
    const pw_hash = userInput.pw;
    axios.post(API_SERVER, {
      id: userInput.id,
      pw_hash,
    })
      .then((res) => {
      // TODO: respones 처리
        console.log('성공');
      });
  };

  return (
    <div className="SignInContainer">
      <div className="SignInLogo">로그인</div>
      <div>
        <div>ID</div>
        <input type="text" onChange={controlInput('id')} />
      </div>
      <div>
        <div>Password</div>
        <input type="password" onChange={controlInput('pw')} />
      </div>
      <div className="SignInBtnContainer">
        <button type="button" onClick={onClickSignIn}>SignIn</button>
        <button type="button">SignUp</button>
      </div>
    </div>
  );
}

export default SignInPage;
