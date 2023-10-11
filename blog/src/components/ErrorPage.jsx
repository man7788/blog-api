import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <h1>Page not found.</h1>
      <Link to="/">Back to homepage</Link>
    </div>
  );
};

export default ErrorPage;
