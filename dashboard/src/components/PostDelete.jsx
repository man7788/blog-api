import { useLocation, Navigate } from 'react-router-dom';
import { useState } from 'react';

const PostDelete = () => {
  const [redirect, setRedirect] = useState(false);
  const [cancel, setCancel] = useState(false);
  // state={login, post} redirect from Post.jsx
  const { state } = useLocation();
  const { token, post } = state;

  const onDeletePost = () => {
    setRedirect(true);
  };

  return (
    <>
      <h3>Are you sure want to delete {state.post.title}</h3>
      <button onClick={() => setCancel(true)}>Cancel</button>{' '}
      <button onClick={onDeletePost}>Delete</button>
      {cancel && (
        <Navigate to={'/user' + post.url} state={{ login: state.login }} />
      )}
      {redirect && (
        <Navigate to={'/dashboard'} state={{ login: state.login }} />
      )}
    </>
  );
};

export default PostDelete;
