import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Post from './Post';
import ErrorPage from './ErrorPage';
import Dashboard from './Dashboard';
import PostEdit from './PostEdit';
import PostDelete from './PostDelete';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage message={'Page Not Found'} />,
    },
    {
      path: 'user/posts/:postId/edit',
      element: <PostEdit />,
      errorElement: <ErrorPage message={'Error'} />,
    },
    {
      path: 'user/posts/:postId/delete',
      element: <PostDelete />,
      errorElement: <ErrorPage message={'Error'} />,
    },
    {
      path: 'user/posts/:postId',
      element: <Post />,
      errorElement: <ErrorPage message={'Error'} />,
    },
    {
      path: 'dashboard',
      element: <Dashboard />,
      errorElement: <ErrorPage message={'Error'} />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
