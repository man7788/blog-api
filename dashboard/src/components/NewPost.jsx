import { useState, useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';

const NewPost = () => {
  const [auth, setAuth] = useState(false);
  const [redirect, setRedirect] = useState(false);
  // state={login, post, comments} redirect from Post.jsx
  const { state } = useLocation();
  // const { title, content, author, publish, _id } = state.post;

  // const [editTitle, setEditTitle] = useState(title);
  // const [editContent, setEditContent] = useState(content);
  // const [editAuthor, setEditAuthor] = useState(author.username);
  // const [editPublish, setEditPublish] = useState(publish);

  useEffect(() => {
    if (state && state.login === true) {
      setAuth(true);
    }
  }, []);

  const onSubmitForm = (e) => {
    e.preventDefault();

    // const comments = state.comments.length > 0 ? state.comments : [];

    // const updatedPost = {
    //   post: {
    //     title: editTitle,
    //     content: editContent,
    //     author: { username: editAuthor, _id: author._id },
    //     publish: editPublish,
    //     _id,
    //   },
    //   comments,
    // };

    // const postData = JSON.parse(localStorage.getItem('posts'));
    // const newPostData = postData.map((post) => {
    //   if (post.post._id === _id) {
    //     return updatedPost;
    //   } else {
    //     return post;
    //   }
    // });
    // // console.log(newPostData);
    // localStorage.setItem('posts', JSON.stringify(newPostData));
    // setRedirect(true);
  };

  return (
    <>
      {auth ? (
        <div>
          <h1>New Post</h1>
          {/* <form
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
              onChange={(event) =>
                setEditPublish(event.target.value ? true : false)
              }>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <button type="submit">Submit</button>
          </form> */}
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
