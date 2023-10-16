import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Comment = ({ props }) => {
  const [editComment, setEditComment] = useState(false);
  const [deleteComment, setDeleteComment] = useState(false);

  const { login } = props;
  const { comment, author, date_formatted, url } = props.comment;

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
          state={{ login, comment: props.comment }}
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
