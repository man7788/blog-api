import Comment from './Comment';
import { Link, useParams, useLocation } from 'react-router-dom';
import { posts, post } from '../../../testData';
import { useState, useEffect } from 'react';

const { comments } = post;
const query = (id) => {
  for (const post of posts) {
    if (post._id === id) {
      return post;
    }
  }
};

const decrypt = 'huehuehue';

const Post = () => {
  const [auth, setAuth] = useState(false);
  const { state } = useLocation();

  const { postId } = useParams();
  const post = query(postId);
  const { title, content, author, date_formatted } = post;

  useEffect(() => {
    state === decrypt && setAuth(true);
  }, []);

  return (
    <div>
      {auth ? (
        <div>
          <h3>{title}</h3>
          <p>{content}</p>
          <p>Author: {author.username}</p>
          <p>{date_formatted}</p>
          <button>Edit</button> <button>Delete</button>
          <h3>Comment</h3>
          {comments.map((comment) => (
            <Comment key={comment._id} {...comment} />
          ))}
          <Link to="/dashboard" state={state}>
            Back to dashboard
          </Link>
        </div>
      ) : (
        <div>
          <h1>Forbidden</h1>
          <Link to="/">Back to homepage</Link>
        </div>
      )}
    </div>
  );
};

export default Post;
