import { useState, useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';

const NewPost = () => {
  const [auth, setAuth] = useState(false);
  const [redirect, setRedirect] = useState(false);
  // state={login, post, comments} redirect from Post.jsx
  const { state } = useLocation();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [publish, setPublish] = useState(false);

  useEffect(() => {
    if (state && state.login === true) {
      setAuth(true);
    }
  }, []);

  const onSubmitForm = (e) => {
    e.preventDefault();

    // const postData = JSON.parse(localStorage.getItem('posts'));

    const newPost = { title, content, publish };
    console.log(newPost);

    // localStorage.setItem('posts', JSON.stringify(newPost));
    setRedirect(true);
  };

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
          <Link to={'/dashboard'} state={{ login: state.login }}>
            Cancel
          </Link>
          {redirect && (
            <Navigate
              to={'/dashboard'}
              state={{
                login: state.login,
              }}
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

export default NewPost;
