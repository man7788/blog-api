import "./App.css";
import { useEffect } from "react";
import Card from "./components/Card";
import testData from "../../testData.jsx";

// localStorage.setItem("overview", JSON.stringify(testData.overview));
// localStorage.setItem("posts", JSON.stringify(testData.posts));
// localStorage.setItem("user", JSON.stringify(testData.user));
// localStorage.setItem("token", JSON.stringify(testData.token));
// localStorage.setItem('diu', JSON.stringify('on99'));
// localStorage.removeItem('secretKey');
// localStorage.clear();

const App = () => {
  const posts = JSON.parse(localStorage.getItem("overview"));

  return (
    <>
      <h1>Blog</h1>
      {posts ? (
        posts.map((post) => <Card key={post._id} {...post} />)
      ) : (
        <p>No post to show</p>
      )}
    </>
  );
};

export default App;
