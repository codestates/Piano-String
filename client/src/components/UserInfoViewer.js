import axios from 'axios';
import React, { useState } from 'react';
import hashPassword from '../utils/hashPassword';
import appConfig from '../app.config';

function UserInfoViewer({ userState }) {

  const [isEditing, setIsEditing] = useState(false);

  const [userInput, setUserInput] = useState({
    pw: '',
    name: '',
    pwCheck: '',
  });

  const controlInputValue = key => (e) => {
    setUserInput({ ...userInput, [key]: e.target.value });
  };

  const onClickUpdate = () => {
    const { pw, name, pwCheck } = userInput;

    if (pw !== pwCheck) { return; }

    hashPassword(pw)
      .then((pw_hash) => {
        axios.post(API_SERVER, {
          pw_hash,
          name,
        })
          .then((res) => {
            console.log('정보 변경 성공');
          });
      });
  };

  return (
    <div>
      { isEditing
        ? (
          <div className="userInfoWrap">
            <div>유저 아이디</div>
            <div>{userState.info.user_id}</div>
            <div>유저 이름</div>
            <div>{userState.info.name}</div>
            <div>변경할 비밀번호</div>
            <input type="password" onChange={controlInputValue('pw')} />
            <div>변결할 비밀번호 확인</div>
            <input type="password" value={userInput.pwCheck} onChange={controlInputValue('pwCheck')} />
            <div className="buttonWrap">
              <button type="button" onClick={() => setIsEditing(false)}>취소하기</button>
              <button type="button">확인</button>
            </div>
          </div>
        )
        : (
          <div className="userInfoWrap">
            <div>유저 아이디</div>
            <div>{userState.info.userId}</div>
            <div>유저 이름</div>
            <div>{userState.info.name}</div>
            <button type="button" onClick={() => setIsEditing(true)}>수정하기</button>
            <button type="button">탈퇴하기</button>
          </div>
        )}
    </div>
  );
}

export default UserInfoViewer;
