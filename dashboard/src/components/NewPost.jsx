import { useState, useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';

const NewPost = () => {
  const [auth, setAuth] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [publish, setPublish] = useState(false);

  const [serverError, setServerError] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  const [error, setError] = useState();
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
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  const onSubmitForm = (e) => {
    e.preventDefault();
    setLoading(true);

    const newPost = { title, content, publish };
    console.log(newPost);

    const token = JSON.parse(localStorage.getItem('token'));

    fetch(`http://localhost:3000/user/posts/create`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPost),
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
          <h1>New Post</h1>
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
              value={title}
              onChange={(event) => setTitle(event.target.value)}></input>
            <label htmlFor="content">Content:</label>
            <input
              type="text"
              name="content"
              id="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}></input>
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              name="author"
              id="author"
              value={author}
              placeholder="Admin"
              onChange={(event) => setAuthor(event.target.value)}></input>
            <label htmlFor="publish">Publish:</label>
            <select
              defaultValue={publish === true ? true : false}
              name="publish"
              id="publish"
              onChange={(event) =>
                setPublish(event.target.value ? true : false)
              }>
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
          <Link to={'/dashboard'}>Cancel</Link>
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

export default NewPost;
