import { Link, useParams } from "react-router-dom";

const Card = (props) => {
  const { title, author, date_formatted, url } = props;

  return (
    <div>
      <h3>
        <Link to={url}>{title}</Link>
      </h3>
      <p>Author: {author.username}</p>
      <p>{date_formatted}</p>
    </div>
  );
};

export default Card;
