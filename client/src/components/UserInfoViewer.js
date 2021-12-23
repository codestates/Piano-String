import axios from 'axios';
import React, { useState } from 'react';
import hashPassword from '../utils/hashPassword';
import appConfig from '../app.config';

function UserInfoViewer({ setIsModalVisible, uuid, userInfo }) {
  console.log('====InfoViewer====\n', userInfo);
  const [isEditing, setIsEditing] = useState(false);

  const [userInput, setUserInput] = useState({
    name: '',
    pw: '',
    pwCheck: '',
  });

  const controlInputValue = key => (e) => {
    setUserInput({ ...userInput, [key]: e.target.value });
  };

  const onClickCancel = () => {
    setUserInput({name:'', pw:'', pwCheck: ''});
    setIsEditing(false);
  }

  const onClickUpdate = () => {
    const { name, pw, pwCheck } = userInput;

    if (pw !== pwCheck) { return; }

    hashPassword(pw)
      .then((pw_hash) => {
        axios.patch(`${appConfig.API_SERVER}/user/${uuid}`, { pw_hash })
          .then((res) => {
            console.log('정보 변경 성공');
          });
        // TODO: exception handling
      });
  };

  return (
    <div>
      { isEditing
        ? (
          <div className="userInfoWrap">
            <div className="userInfo">유저 아이디</div>
            <div>{userInfo.user_id}</div>
            <div className="userInfo">유저 이름</div>
            <div>{userInfo.name}</div>
            <div className="userInfo">변경할 비밀번호</div>
            <input type="password" onChange={controlInputValue('pw')} />
            <div className="userInfo">변결할 비밀번호 확인</div>
            <input type="password" value={userInput.pwCheck} onChange={controlInputValue('pwCheck')} />
            <div className="buttonWrap">
              <button type="button" onClick={onClickCancel}>취소하기</button>
              <button type="button" onClick={onClickUpdate}>확인</button>
            </div>
          </div>
        )
        : (
          <div className="userInfoWrap">
            <div className="userInfo">유저 아이디</div>
            <div>{userInfo.userId}</div>
            <div className="userInfo">유저 이름</div>
            <div>{userInfo.name}</div>
            <div className="buttonWrap">
              <button type="button" onClick={() => setIsEditing(true)}>수정하기</button>
              <button type="button" onClick={() => setIsModalVisible(true)}>탈퇴하기</button>
            </div>
          </div>
        )}
    </div>
  );
}

export default UserInfoViewer;
