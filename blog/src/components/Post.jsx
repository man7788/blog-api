import { useEffect, useState } from "react";
import Comment from "./Comment";
import { Link, useParams } from "react-router-dom";

const Post = () => {
  const { postId } = useParams();

  const [post, setPost] = useState({
    title: "",
    content: "",
    author: "",
    date_formatted: "",
  });
  const [comments, setComments] = useState({ comment: [] });
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const { title, content, author, date_formatted } = post;

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${postId}`, { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => {
        setPost(response.post);
        setComments(response.comments);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  const onNewComment = () => {};

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h3>{title}</h3>
      <p>{content}</p>
      <p>Author: {author.username}</p>
      <p>{date_formatted}</p>
      <h3>Comment</h3>
      {comments.length > 0 ? (
        comments.map((comment) => <Comment key={comment._id} {...comment} />)
      ) : (
        <p>No comment to show</p>
      )}
      <button onClick={onNewComment}>New Comment</button>
      <div>
        <Link to="/">Back to homepage</Link>
      </div>
    </div>
  );
};

export default Post;
