/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import "./App.css";
import { posts, post } from "./testData";

console.log(posts);
console.log(post);

const Card = (props) => {
  const { title, author, date_formatted, url } = props;

  return (
    <div>
      <h3>
        <a href={url}>{title}</a>
      </h3>
      <p>Author: {author.username}</p>
      <p>{date_formatted}</p>
    </div>
  );
};

const Comment = ({ comment, author, date_formatted }) => {
  return (
    <div style={{ border: "2px solid white" }}>
      <p>{comment}</p>
      <p>By: {author}</p>
      <p>{date_formatted}</p>
    </div>
  );
};

const Post = ({ post, comments }) => {
  const { title, author, content, date_formatted } = post;

  return (
    <div>
      <h3>{title}</h3>
      <p>{content}</p>
      <p>Author: {author.username}</p>
      <p>{date_formatted}</p>
      Comment
      {comments.map((comment) => (
        <Comment key={comment._id} {...comment} />
      ))}
    </div>
  );
};

// const App = () => {
//   return (
//     <>
//       <Post key={post.post._id} {...post} />
//     </>
//   );
// };
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
