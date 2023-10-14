import { useLocation, Navigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const PostDelete = () => {
  const [auth, setAuth] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [cancel, setCancel] = useState(false);
  // state={login, post} redirect from Post.jsx
  const { state } = useLocation();

  useEffect(() => {
    if (state && state.login === true) {
      setAuth(true);
    }
  }, []);

  const onDeletePost = () => {
    const postData = JSON.parse(localStorage.getItem('posts'));
    const newPostData = postData.filter((post) => {
      if (post.post._id !== state.post._id) {
        return post;
      }
    });
    console.log(newPostData);
    localStorage.setItem('posts', JSON.stringify(newPostData));
    setRedirect(true);
  };

  return (
    <>
      {auth ? (
        <div>
          <h3>Are you sure want to delete {state.post.title}?</h3>
          <button onClick={() => setCancel(true)}>Cancel</button>{' '}
          <button onClick={onDeletePost}>Delete</button>
          {cancel && (
            <Navigate
              to={'/user/posts/' + state.post._id}
              state={{ login: state.login }}
            />
          )}
          {redirect && (
            <Navigate to={'/dashboard'} state={{ login: state.login }} />
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

export default PostDelete;
