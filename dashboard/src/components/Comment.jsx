import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const Comment = ({ url, comment, author, date_formatted, post, login }) => {
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
          to={'/user' + url + '/edit'}
          state={{
            login,
            post,
            comment,
          }}
        />
      )}
      {deleteComment && (
        <Navigate
          to={'/user' + url + '/delete'}
          state={{
            login,
            comment,
          }}
        />
      )}
    </div>
  );
};

export default Comment;
