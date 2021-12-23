import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function MenuItem({ to, text }) {
  return (
    <li>
      <Link {...{ to }}>{text}</Link>
    </li>
  );
}

const TopNavigation = ({ userState, onClickSignOut }) => {
  const navigate = useNavigate();

  return (
  <nav className="TopNavigation">
    <div className="TopNavigation_logo">
      Piano String
    </div>

    { userState.isSignedIn
      ? (
        <ul className="TopNavigation_manu">
          <MenuItem to="/announcement" text="Announcement" />
          <MenuItem to="/article/write" text="Post" />
          <MenuItem to="/user" text="MyPage" />
          <button className="topbuttom" type="button" onClick={onClickSignOut}>Sign out</button>
        </ul>
      )
      : (
        <ul className="TopNavigation_manu">
          <button type="button" onClick={()=>navigate('/sign-in')}>Sign in</button>
        </ul>
      )}
  </nav>
  )
};

export default TopNavigation;
