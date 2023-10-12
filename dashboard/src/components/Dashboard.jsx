import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Card from './Card';
import { posts } from '../../../testData.jsx';

const encrypt = 'huehuehue';

const Dashboard = () => {
  const [auth, setAuth] = useState(false);
  const { state } = useLocation();

  useEffect(() => {
    state === encrypt && setAuth(true);
  });

  return (
    <>
      {auth ? (
        <>
          <h1>Dashboard</h1>
          <p>Welcome back!</p>
          {posts.map((post) => (
            <Card key={post._id} {...post} state={state} />
          ))}
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
