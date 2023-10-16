import { useState, useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';

const CommentEdit = () => {
  const [auth, setAuth] = useState(false);
  const [redirect, setRedirect] = useState(false);
  // state={login, props.comment} redirect from Comment.jsx
  const { state } = useLocation();
  const { login } = state;
  const { comment, author, _id, post } = state.comment;

  const originalComment = state.comment;

  useEffect(() => {
    if (state && login === true) {
      setAuth(true);
    }
  }, []);

  const [editComment, setEditComment] = useState(comment);
  const [editAuthor, setEditAuthor] = useState(author);

  const onSubmitForm = (e) => {
    e.preventDefault();

    const updatedComment = {
      ...originalComment,
      comment: editComment,
      author: editAuthor,
    };

    const postData = JSON.parse(localStorage.getItem('posts'));

    const newPostData = postData.map((post) => {
      const newCommentData = post.comments.map((comment) => {
        if (comment._id === _id) {
          return updatedComment;
        } else {
          return comment;
        }
      });
      post.comments = newCommentData;
      return post;
    });
    localStorage.setItem('posts', JSON.stringify(newPostData));
    setRedirect(true);
  };

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
          {redirect && (
            <Navigate
              to={'/user/posts/' + post}
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
      <Link to={'/user/posts/' + post} state={{ login: state.login }}>
        Cancel
      </Link>
    </>
  );
};

export default CommentEdit;
