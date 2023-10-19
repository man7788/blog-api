import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Comment = ({ props }) => {
  const [editComment, setEditComment] = useState(false);
  const [deleteComment, setDeleteComment] = useState(false);

  const { comment, author, date_formatted, url, _id, post } = props;

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
          state={{ comment, author, _id, post }}
        />
      )}
      {deleteComment && (
        <Navigate
          to={'/user' + url + '/delete'}
          state={{ comment, author, _id, post }}
        />
      )}
    </div>
  );
};

export default Comment;
