import './App.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [serverError, setServerError] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const onSubmitForm = (e) => {
    e.preventDefault();
    setLoading(true);

    const newSignIn = { username, password };

    fetch(`http://localhost:3000/user/log-in`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSignIn),
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('server error');
        }
        return response.json();
      })
      .then((response) => {
        if (response && response.errors) {
          setFormErrors(response.errors);
          throw new Error('login error');
        }
        console.log('Success:', response);
        localStorage.setItem('token', JSON.stringify(response.token));
        setRedirect(true);
      })
      .catch((error) => {
        if (error && error.message !== 'login error') {
          setServerError(error);
        }
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  if (serverError) {
    return (
      <div>
        <h1>Login</h1> <p>A network error was encountered</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <h1>Login</h1> <p>Loading...</p>
      </div>
    );
  }
  return (
    <>
      <h1>Login</h1>
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
        <button type="submit">Sign in</button>
      </form>
      {formErrors ? (
        <ul>
          {formErrors.map((error) => (
            <li key={error.msg}>{error.msg}</li>
          ))}
        </ul>
      ) : null}
      {redirect && <Navigate to={'/dashboard'} />}
    </>
  );
};

export default App;
