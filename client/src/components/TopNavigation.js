import { Link } from 'react-router-dom';

function MenuItem({ to, text }) {
  return (
    <li>
      <Link {...{ to }}>{text}</Link>
    </li>
  );
}

const TopNavigation = ({ userState, onClickSignOut }) => {

  return (
  <nav className="TopNavigation">
    <div className="TopNavigation_logo">
      <Link to="/">음악 일기</Link>
    </div>

    { userState.isSignedIn
      ? (
        <ul className="TopNavigation_manu">
          <MenuItem to="/announcement" text="Announcement" />
          <MenuItem to="/article/write" text="Post" />
          <MenuItem to="/user" text="MyPage" />
          <li>
            <button type="button" onClick={onClickSignOut}>Sign out</button>
          </li>
        </ul>
      )
      : (
        <ul className="TopNavigation_manu">
          <MenuItem to="/sign-in" text="Sign in" />
        </ul>
      )}
  </nav>
  )
};

export default TopNavigation;
