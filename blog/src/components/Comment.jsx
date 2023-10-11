const Comment = ({ comment, author, date_formatted }) => {
  return (
    <div style={{ border: "2px solid white" }}>
      <p>{comment}</p>
      <p>By: {author}</p>
      <p>{date_formatted}</p>
    </div>
  );
};

export default Comment;
