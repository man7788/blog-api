import { useState, useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';

const CommentEdit = () => {
  const [auth, setAuth] = useState(false);
  const [redirect, setRedirect] = useState(false);
  // state={comment, post} redirect from Comment.jsx
  const { state } = useLocation();
  const { comment, author, _id, post } = state;

  const [serverError, setServerError] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

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

  const [editComment, setEditComment] = useState(comment);
  const [editAuthor, setEditAuthor] = useState(author);

  const onSubmitForm = (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedComment = {
      comment: editComment,
      author: editAuthor,
    };

    const token = JSON.parse(localStorage.getItem('token'));

    fetch(`http://localhost:3000/user/comments/${_id}/edit`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedComment),
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('server error');
        }
        return response.json();
      })
      .then((response) => {
        if (response && response.errors) {
          setFormErrors(response.errors);
          throw new Error('form validation error');
        }
        console.log('Success:', response);

        setRedirect(true);
      })
      .catch((error) => {
        if (error && error.message !== 'form validation error') {
          setServerError(error);
        }
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  if (serverError) {
    return (
      <div>
        <h1>New Post</h1> <p>A network error was encountered</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <h1>New Post</h1> <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      {auth ? (
        <div>
          <h1>Edit Comment</h1>
          <form
            action=""
            method="post"
            onSubmit={onSubmitForm}
            style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="comment">Comment:</label>
            <input
              type="text"
              name="comment"
              id="comment"
              value={editComment}
              onChange={(event) => setEditComment(event.target.value)}></input>
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              name="author"
              id="author"
              value={editAuthor}
              onChange={(event) => setEditAuthor(event.target.value)}></input>
            <button type="submit">Submit</button>
          </form>
          {formErrors ? (
            <ul>
              {formErrors.map((error) => (
                <li key={error.msg}>{error.msg}</li>
              ))}
            </ul>
          ) : null}
          <Link to={'/user/posts/' + post}>Cancel</Link>
          {redirect && <Navigate to={'/user/posts/' + post} />}
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

export default CommentEdit;
