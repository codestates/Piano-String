import axios from 'axios';
import React, { useState } from 'react';
import hashPassword from '../utils/hashPassword';

function userInfoViewer({ controlUpdateInfo, updateInfo, userInfo }) {
  const [userInput, setUserInput] = useState({
    pw: '',
    name: '',
    pwCheck: '',
  });
  const API_SERVER = '';

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
      {updateInfo
        ? (
          <div className="userInfoWrap">
            <div>유저 아이디</div>
            <div>{userInfo.user_id}</div>
            <div>유저 이름</div>
            <div>{userInfo.name}</div>
            <div>변경할 비밀번호</div>
            <input type="password" onChange={controlInputValue('pw')} />
            <div>변결할 비밀번호 확인</div>
            <input type="password" value={userInput.pwCheck} onChange={controlInputValue('pwCheck')} />
            <div className="buttonWrap">
              <button type="button" onClick={controlUpdateInfo}>취소하기</button>
              <button type="button" onClick={onClickUpdate}>수정하기</button>
            </div>
          </div>
        )
        : (
          <div className="userInfoWrap">
            <div>유저 아이디</div>
            <div>{userInfo.user_id}</div>
            <div>유저 이름</div>
            <div>{userInfo.name}</div>
          </div>
        )}
    </div>
  );
}

export default userInfoViewer;
