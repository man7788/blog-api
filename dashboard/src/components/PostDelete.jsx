import { useLocation, Navigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const PostDelete = () => {
  const [auth, setAuth] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [cancel, setCancel] = useState(false);
  // state={login, post} redirect from Post.jsx
  const { state } = useLocation();
  const { _id } = state.post;

  const [serverError, setServerError] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    fetch('http://localhost:3000/user/auth', {
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
        if (response && response.status === true) {
          setAuth(true);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const onDeletePost = () => {
    const token = JSON.parse(localStorage.getItem('token'));

    fetch(`http://localhost:3000/user/posts/${_id}/delete`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('server error');
        }
        setRedirect(true);
        return response.json();
      })
      .catch((error) => {
        if (error && error.message !== 'form validation error') {
          setServerError(error);
        }
        console.error(error);
      });
  };

  if (serverError) {
    return (
      <div>
        <h1>Delete Post</h1> <p>A network error was encountered</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <h1>Delete Post</h1> <p>Loading...</p>
      </div>
    );
  }

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
          {redirect && <Navigate to={'/dashboard'} />}
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
