import Comment from "./Comment";

const Post = ({ post, comments }) => {
  const { title, author, content, date_formatted } = post;

  return (
    <div>
      <h3>{title}</h3>
      <p>{content}</p>
      <p>Author: {author.username}</p>
      <p>{date_formatted}</p>
      Comment
      {comments.map((comment) => (
        <Comment key={comment._id} {...comment} />
      ))}
    </div>
  );
};

export default Post;
