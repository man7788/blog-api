import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Card from './Card';

const Dashboard = () => {
  const [auth, setAuth] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [posts, setPosts] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    fetch('http://localhost:3000/user/posts', {
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
        setPosts(response.posts);
        setAuth(true);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  const onNewPost = () => {
    setRedirect(true);
  };

  if (error) {
    return (
      <div>
        <h1>Dashboard</h1> <p>A network error was encountered</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <h1>Dashboard</h1> <p>Loading...</p>
      </div>
    );
  }
  return (
    <>
      {auth ? (
        <>
          <h1>Dashboard</h1>
          <p>Welcome back!</p>
          {posts ? (
            posts.map((post) => <Card key={post._id} {...post} />)
          ) : (
            <p>No post to show</p>
          )}
          <button onClick={onNewPost}>New Post</button>
          {redirect && <Navigate to={'/new-post'} />}
        </>
      ) : (
        <div>
          <h1>Forbidden</h1>
          <Link to="/">Back to homepage</Link>
        </div>
      )}
    </>
  );
};

export default Dashboard;
