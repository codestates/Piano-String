import React, { useState } from 'react';

const TopNavigation = ({ controlLogin, isLogin }) => (
  <nav className="TopNavigation">
    <div className="TopNavigation_logo">
      음악 일기
    </div>

    {isLogin
      ? (
        <ul className="TopNavigation_manu">
          <li>Announcement</li>
          <li>Post</li>
          <li>MyPage</li>
          <li onClick={controlLogin} onKeyDown={controlLogin}>Logout</li>
        </ul>
      )
      : (
        <ul className="TopNavigation_manu">
          <li onClick={controlLogin} onKeyDown={controlLogin}>Login</li>
        </ul>
      )}
  </nav>
);

export default TopNavigation;
