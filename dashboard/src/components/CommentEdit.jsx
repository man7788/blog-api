import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const CommentEdit = () => {
  // state={login, } redirect from Post.jsx
  const { state } = useLocation();
  // const { title, content, author, publish, url } = state.post;

  // const [editTitle, setEditTitle] = useState(title);
  // const [editContent, setEditContent] = useState(content);
  // const [editAuthor, setEditAuthor] = useState(author.username);
  // const [editPublish, setEditPublish] = useState(publish);

  // const onSubmitForm = (e) => {
  //   e.preventDefault();
  // };

  return (
    <>
      CEdit
      {/* <h1>Edit</h1>
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
          id="publish">
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      <Link to={'/user' + url} state={{ login: state.login }}>
        Cancel
      </Link> */}
    </>
  );
};

export default CommentEdit;
