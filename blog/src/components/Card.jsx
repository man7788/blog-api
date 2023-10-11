const Card = (props) => {
  const { title, author, date_formatted, url } = props;

  return (
    <div>
      <h3>
        <a href={url}>{title}</a>
      </h3>
      <p>Author: {author.username}</p>
      <p>{date_formatted}</p>
    </div>
  );
};

export default Card;
