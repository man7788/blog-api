import Comment from './Comment';
import { Link, useParams, useLocation, Navigate } from 'react-router-dom';
import { posts, post } from '../../../testData';
import { useState, useEffect } from 'react';

const { comments } = post;
const query = (id) => {
  for (const post of posts) {
    if (post._id === id) {
      return post;
    }
  }
};

const decrypt = 'huehuehue';

const Post = () => {
  const [auth, setAuth] = useState(false);
  const { state } = useLocation();
  const token = state;

  const { postId } = useParams();
  const post = query(postId);
  const { title, content, author, date_formatted, url } = post;

  const [editPost, setEditPost] = useState(false);
  const [deletePost, setDeletePost] = useState(false);

  useEffect(() => {
    token === decrypt && setAuth(true);
  }, []);

  return (
    <div>
      {auth ? (
        <div>
          <h3>{title}</h3>
          <p>{content}</p>
          <p>Author: {author.username}</p>
          <p>{date_formatted}</p>
          <button onClick={() => setEditPost(true)}>Edit</button>{' '}
          <button onClick={() => setDeletePost(true)}>Delete</button>
          <h3>Comment</h3>
          {comments.map((comment) => (
            <Comment key={comment._id} {...comment} />
          ))}
          <Link to="/dashboard" state={state}>
            Back to dashboard
          </Link>
        </div>
      ) : (
        <div>
          <h1>Forbidden</h1>
          <Link to="/">Back to homepage</Link>
        </div>
      )}
      {editPost && (
        <Navigate to={'/user' + url + '/edit'} state={{ token, post }} />
      )}
      {deletePost && (
        <Navigate to={'/user' + url + '/delete'} state={{ token, post }} />
      )}
    </div>
  );
};

export default Post;
