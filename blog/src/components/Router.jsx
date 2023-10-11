import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Post from "./Post";
import ErrorPage from "./ErrorPage";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "posts/:postId",
      element: <Post />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
