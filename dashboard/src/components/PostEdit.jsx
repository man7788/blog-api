import { useState, useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';

const PostEdit = () => {
  const [auth, setAuth] = useState(false);
  const [redirect, setRedirect] = useState(false);
  // state={post} redirect from Post.jsx
  const { state } = useLocation();
  const { title, content, author, publish, _id } = state.post;

  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const [editAuthor, setEditAuthor] = useState(author.username);
  const [editPublish, setEditPublish] = useState(publish);

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

  const onSubmitForm = (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedPost = {
      title: editTitle,
      content: editContent,
      publish: editPublish,
      _id,
    };

    const token = JSON.parse(localStorage.getItem('token'));

    fetch(`http://localhost:3000/user/posts/${_id}/edit`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedPost),
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

    console.log(updatedPost);
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
          <h1>Edit Post</h1>
          <form
            action=""
            method="post"
            onSubmit={onSubmitForm}
            style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              value={editTitle}
              onChange={(event) => setEditTitle(event.target.value)}></input>
            <label htmlFor="content">Content:</label>
            <input
              type="text"
              name="content"
              id="content"
              value={editContent}
              onChange={(event) => setEditContent(event.target.value)}></input>
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              name="author"
              id="author"
              value={editAuthor}
              onChange={(event) => setEditAuthor(event.target.value)}></input>
            <label htmlFor="publish">Publish:</label>
            <select
              defaultValue={publish === true ? true : false}
              name="publish"
              id="publish"
              onChange={(event) => setEditPublish(event.target.value)}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <button type="submit">Submit</button>
          </form>
          {formErrors ? (
            <ul>
              {formErrors.map((error) => (
                <li key={error.msg}>{error.msg}</li>
              ))}
            </ul>
          ) : null}
          <Link to={'/user/posts/' + _id}>Cancel</Link>
          {redirect && <Navigate to={'/user/posts/' + _id} />}
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

export default PostEdit;
