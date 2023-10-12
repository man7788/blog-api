import './App.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const user = { username: 'asd', password: 'asd' };
const encrypt = 'huehuehue';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (username === user.username && password === user.password) {
      setToken(encrypt);
    } else {
      setError('Wrong username or password.');
    }
  };

  return (
    <>
      <h1>Dashboard</h1>
      <form action="" method="post" onSubmit={onSubmitForm}>
        <label htmlFor="name">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}></input>
        <label htmlFor="name">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}></input>
        <button type="submit">Submit</button>
      </form>
      {error.length > 0 && error}
      {token.length > 0 && (
        <Navigate to="dashboard" replace={true} state={token} />
      )}
    </>
  );
};

export default App;
