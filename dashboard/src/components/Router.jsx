import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Post from './Post';
import ErrorPage from './ErrorPage';
import Dashboard from './Dashboard';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage message={'Page Not Found'} />,
    },
    {
      path: 'user/posts/:postId',
      element: <Post />,
      errorElement: <ErrorPage message={'Forbidden'} />,
    },
    {
      path: 'dashboard',
      element: <Dashboard />,
      errorElement: <ErrorPage message={'Forbidden'} />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
