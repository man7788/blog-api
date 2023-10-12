const Comment = ({ comment, author, date_formatted }) => {
  return (
    <div style={{ border: '2px solid white' }}>
      <p>{comment}</p>
      <p>By: {author}</p>
      <p>{date_formatted}</p>
      <button>Edit</button> <button>Delete</button>
    </div>
  );
};

export default Comment;
