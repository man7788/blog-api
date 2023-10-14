import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const Comment = ({ comment, author, date_formatted, post, login }) => {
  const [editComment, setEditComment] = useState(false);
  const [deleteComment, setDeleteComment] = useState(false);

  return (
    <div style={{ border: '2px solid white' }}>
      <p>{comment}</p>
      <p>By: {author}</p>
      <p>{date_formatted}</p>
      <button onClick={() => setEditComment(true)}>Edit</button>{' '}
      <button onClick={() => setDeleteComment(true)}>Delete</button>
      {editComment && (
        <Navigate
          to={'/user/posts/' + post + '/comment/edit'}
          state={{
            login,
            post,
            comment,
          }}
        />
      )}
      {deleteComment && (
        <Navigate
          to={'/user/posts/' + post + '/comment/delete'}
          state={{
            login,
            post,
            comment,
          }}
        />
      )}
    </div>
  );
};

export default Comment;
