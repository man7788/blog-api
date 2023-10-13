import './App.css';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import testData from '../../testData.jsx';

// localStorage.setItem('overview', JSON.stringify(testData.overview));
// localStorage.setItem('posts', JSON.stringify(testData.posts));
// localStorage.setItem('user', JSON.stringify(testData.user));
// localStorage.setItem('token', JSON.stringify(testData.token));
// localStorage.setItem('diu', JSON.stringify('on99'));
// localStorage.removeItem('secretKey');
// localStorage.clear();

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);
  const [error, setError] = useState('');

  // Delete after API implementation
  const [user, setUser] = useState('');

  // Delete after API implementation
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    userData && setUser(userData);
  }, []);

  const onSubmitForm = (e) => {
    e.preventDefault();

    // const token = <API call with form data here>
    // if (token) {
    // localStorage.setItem('token', JSON.stringify(token));
    // setLogin(true);
    // }
    if (username === user.username && password === user.password) {
      // localStorage.setItem('token', JSON.stringify(token));
      setLogin(true);
      console.log('login');
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
      {login === true && (
        <Navigate to="dashboard" replace={true} state={{ login }} />
      )}
    </>
  );
};

export default App;
