/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import "./App.css";
import Card from "./components/Card";
import { posts, post } from "../../testData";

// console.log(posts);
// console.log(post);

const App = () => {
  return (
    <>
      <h1>Blog</h1>
      {posts.map((post) => (
        <Card key={post._id} {...post} />
      ))}
    </>
  );
};

export default App;
