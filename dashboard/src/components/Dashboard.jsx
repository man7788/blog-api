import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Card from './Card';

const Dashboard = () => {
  const [auth, setAuth] = useState(false);
  const [posts, setPosts] = useState();
  // state={login} redirect from App.jsx
  const { state } = useLocation();

  useEffect(() => {
    if (state && state.login === true) {
      setAuth(true);
      // const checkToken = JSON.parse(localStorage.getItem('token'));
      // const postData = <API call with token header>
      const postData = JSON.parse(localStorage.getItem('overview'));
      if (postData) {
        setPosts(postData);
      }
    }
  }, []);

  return (
    <>
      {auth ? (
        <>
          <h1>Dashboard</h1>
          <p>Welcome back!</p>
          {posts ? (
            posts.map((post) => <Card key={post._id} {...post} state={state} />)
          ) : (
            <p>No post to show</p>
          )}
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
