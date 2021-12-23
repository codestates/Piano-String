import { Link } from 'react-router-dom';

function articleListItem({ base, uuid, title, created_at }) {
  return (
    <div>
      <span>{uuid}</span>
      <Link to={`/${base}/${uuid}`}>{ title }</Link>
      <span>{created_at}</span>
    </div>
  );
}

export default articleListItem;
