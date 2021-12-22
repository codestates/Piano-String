import React, { useState } from 'react';

const TopNavigation = ({ userState }) => (
  <nav className="TopNavigation">
    <div className="TopNavigation_logo">
      음악 일기
    </div>

    { userState.isSignedIn
      ? (
        <ul className="TopNavigation_manu">
          <li>Announcement</li>
          <li>Post</li>
          <li>MyPage</li>
          <li>Logout</li>
        </ul>
      )
      : (
        <ul className="TopNavigation_manu">
          <li>Login</li>
        </ul>
      )}
  </nav>
);

export default TopNavigation;
