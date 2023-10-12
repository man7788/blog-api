import { Link } from 'react-router-dom';

const ErrorPage = ({ message }) => {
  return (
    <div>
      <h1>{message}</h1>
      <Link to="/">Back to homepage</Link>
    </div>
  );
};

export default ErrorPage;
