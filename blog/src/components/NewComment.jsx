import { useState, useEffect } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";

const NewComment = () => {
  const [redirect, setRedirect] = useState(false);
  const { state } = useLocation();
  const { _id } = state;

  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");

  const [errors, setErrors] = useState(null);

  const onSubmitForm = (e) => {
    e.preventDefault();

    const newComment = { comment, author };
    // console.log(newComment);

    fetch(`http://localhost:3000/posts/${_id}/comment/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => {
        if (response && response.errors) {
          setErrors(response.errors);
          throw new Error("form validation error");
        }
        console.log("Success:", response);
        setRedirect(true);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div>
        <h1> New Comment</h1>
        <form
          action=""
          method="post"
          onSubmit={onSubmitForm}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label htmlFor="title">Comment:</label>
          <input
            type="text"
            name="comment"
            id="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          ></input>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            name="author"
            id="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          ></input>
          <button type="submit">Submit</button>
        </form>
        {errors ? (
          <ul>
            {errors.map((error) => (
              <li key={error.msg}>{error.msg}</li>
            ))}
          </ul>
        ) : null}
        <Link to={"/posts/" + _id}>Cancel</Link>
        {redirect && <Navigate to={"/posts/" + _id} />}
      </div>
    </>
  );
};

export default NewComment;
