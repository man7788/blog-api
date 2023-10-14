import Comment from './Comment';
import { Link, useParams, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const query = (id, posts) => {
  for (const post of posts) {
    if (post.post._id === id) {
      return post;
    }
  }
};

const Post = () => {
  const [auth, setAuth] = useState(false);
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  // state={login} redirect from Card.jsx
  const { state } = useLocation();
  const { postId } = useParams();

  useEffect(() => {
    if (state && state.login === true) {
      setAuth(true);
      // const checkToken = JSON.parse(localStorage.getItem('token'));
      // const postData = <API call with token header>
      const postData = JSON.parse(localStorage.getItem('posts'));
      if (postData) {
        const postDetail = query(postId, postData);
        // console.log(postDetail);
        setPost(postDetail.post);
        setComments(postDetail.comments);
      }
    }
  }, []);

  const [editPost, setEditPost] = useState(false);
  const [deletePost, setDeletePost] = useState(false);

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
            <Comment key={comment._id} {...comment} login={state.login} />
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
        <Navigate
          to={'/user' + post.url + '/edit'}
          state={{ login: state.login, post }}
        />
      )}
      {deletePost && (
        <Navigate
          to={'/user' + post.url + '/delete'}
          state={{ login: state.login, post }}
        />
      )}
    </div>
  );
};

export default Post;
