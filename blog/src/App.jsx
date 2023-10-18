import "./App.css";
import { useEffect, useState } from "react";
import Card from "./components/Card";

const App = () => {
  const [posts, setPosts] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/posts", { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => setPosts(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1>Blog</h1>
      {loading && <p>Loading...</p>}
      {error && <p>A network error was encountered</p>}
      {posts ? (
        posts.map((post) => <Card key={post._id} {...post} />)
      ) : (
        <p>No post to show</p>
      )}
    </>
  );
};

export default App;
