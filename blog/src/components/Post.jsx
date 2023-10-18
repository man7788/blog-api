import { useEffect, useState } from "react";
import Comment from "./Comment";
import { Link, useParams, Navigate } from "react-router-dom";

const Post = () => {
  const { postId } = useParams();

  const [post, setPost] = useState({
    title: "",
    content: "",
    author: "",
    date_formatted: "",
    _id: "",
  });
  const [comments, setComments] = useState({ comment: [] });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const { title, content, author, date_formatted, _id } = post;

  const [redirect, setRedirect] = useState(false);

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

  const onNewComment = () => {
    setRedirect(true);
  };

  if (error) {
    return (
      <div>
        <h1>Post</h1> <p>A network error was encountered</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <h1>Post</h1> <p>Loading...</p>
      </div>
    );
  }

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
      {redirect && (
        <Navigate
          to={"/posts/" + _id + "/comment/new"}
          state={{ _id }}
        ></Navigate>
      )}
      <div>
        <Link to="/">Back to homepage</Link>
      </div>
    </div>
  );
};

export default Post;
