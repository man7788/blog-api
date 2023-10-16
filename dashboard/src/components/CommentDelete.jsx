import { useLocation, Navigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const CommentDelete = () => {
  const [auth, setAuth] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [cancel, setCancel] = useState(false);
  // state={login, props.comment} redirect from Comment.jsx
  const { state } = useLocation();
  const { login } = state;
  const { comment, _id, post } = state.comment;

  useEffect(() => {
    if (state && login === true) {
      setAuth(true);
    }
  }, []);

  const onDeletePost = () => {
    const postData = JSON.parse(localStorage.getItem('posts'));

    const newPostData = postData.map((post) => {
      const newCommentData = post.comments.filter((comment) => {
        if (comment._id !== _id) {
          return comment;
        }
      });

      post.comments = newCommentData;
      return post;
    });
    console.log(newPostData);
    localStorage.setItem('posts', JSON.stringify(newPostData));
    setRedirect(true);
  };

  return (
    <>
      {auth ? (
        <div>
          <h3>Are you sure want to delete &quot;{comment}&quot;?</h3>
          <button onClick={() => setCancel(true)}>Cancel</button>{' '}
          <button onClick={onDeletePost}>Delete</button>
          {cancel && (
            <Navigate
              to={'/user/posts/' + post}
              state={{ login: state.login }}
            />
          )}
          {redirect && (
            <Navigate
              to={'/user/posts/' + post}
              state={{ login: state.login }}
            />
          )}
        </div>
      ) : (
        <div>
          <h1>Forbbiden</h1>
          <Link to="/">Back to homepage</Link>
        </div>
      )}
    </>
  );
};

export default CommentDelete;
