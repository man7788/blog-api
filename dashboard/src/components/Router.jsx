import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Post from './Post';
import ErrorPage from './ErrorPage';
import Dashboard from './Dashboard';
import PostEdit from './PostEdit';
import PostDelete from './PostDelete';
import CommentEdit from './CommentEdit';
import CommentDelete from './CommentDelete';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage message={'Page Not Found'} />,
    },
    {
      path: 'user/comment/:commentId/edit',
      element: <CommentEdit />,
      errorElement: <ErrorPage message={'Error'} />,
    },
    {
      path: 'user/comment/:commentId/delete',
      element: <CommentDelete />,
      errorElement: <ErrorPage message={'Error'} />,
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
