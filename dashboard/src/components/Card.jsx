import { Link } from 'react-router-dom';

const Card = (props) => {
  const { title, author, date_formatted, url, state } = props;

  return (
    <div>
      <h3>
        <Link to={'/user' + url} state={state}>
          {title}
        </Link>
      </h3>
      <p>Author: {author.username}</p>
      <p>{date_formatted}</p>
    </div>
  );
};

export default Card;
