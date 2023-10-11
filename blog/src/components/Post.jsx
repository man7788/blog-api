import Comment from "./Comment";
import { Link, useParams } from "react-router-dom";
import { posts, post } from "../testData";

const { comments } = post;
const query = (id) => {
  for (const post of posts) {
    if (post._id === id) {
      return post;
    }
  }
};

const Post = () => {
  const { postId } = useParams();
  const post = query(postId);
  const { title, content, author, date_formatted } = post;

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
      <Link to="/">Back to homepage</Link>
    </div>
  );
};

export default Post;
