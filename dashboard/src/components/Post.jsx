import Comment from './Comment';
import { Link, useParams, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Post = () => {
  const { postId } = useParams();
  const [auth, setAuth] = useState(false);
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    fetch(`http://localhost:3000/user/posts/${postId}`, {
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('server error');
        }
        return response.json();
      })
      .then((response) => {
        setPost(response.post);
        setComments(response.comments);
        setAuth(true);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  const [editPost, setEditPost] = useState(false);
  const [deletePost, setDeletePost] = useState(false);

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
      {auth ? (
        <div>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>Author: {post.author.username}</p>
          <p>{post.date_formatted}</p>
          <button onClick={() => setEditPost(true)}>Edit</button>{' '}
          <button onClick={() => setDeletePost(true)}>Delete</button>
          <h3>Comment</h3>
          {comments.map((comment) => (
            <Comment key={comment._id} props={{ comment }} />
          ))}
          <Link to="/dashboard">Back to dashboard</Link>
        </div>
      ) : (
        <div>
          <h1>Forbidden</h1>
          <Link to="/">Back to homepage</Link>
        </div>
      )}
      {editPost && (
        <Navigate to={'/user/posts/' + post._id + '/edit'} state={{ post }} />
      )}
      {deletePost && (
        <Navigate to={'/user/posts/' + post._id + '/delete'} state={{ post }} />
      )}
    </div>
  );
};

export default Post;
