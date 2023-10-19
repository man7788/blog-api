import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Post from "./Post";
import ErrorPage from "./ErrorPage";
import NewComment from "./NewComment";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/posts/:postId/comment/new",
      element: <NewComment />,
      errorElement: <ErrorPage />,
    },
    {
      path: "posts/:postId",
      element: <Post />,
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
