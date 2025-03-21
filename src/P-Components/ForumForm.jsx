import { useState } from "react";
import { useAuthContext } from "../P-Hooks/useAuthContext";
import { useForumContext } from "../P-Hooks/useForumContext";

const CreateForumpost = () => {
  const { user } = useAuthContext();
  const { dispatch } = useForumContext();

  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      setError("You must be logged in to post to the forum");
      return;
    }

    const forumpost = { title, text };

    const response = await fetch(
      "https://discussing-quiz.herokuapp.com/api/forum/newpost",
      {
        method: "POST",
        body: JSON.stringify(forumpost),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    console.log(response);
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setCategory("");
      setTitle("");
      setText("");
      setError(null);
      dispatch({ type: "CREATE_FORUMPOST", payload: json });
    }
  };

  return (
    <div>
      <form className="forum-form" onSubmit={handleSubmit}>
        <div class="rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px]">
          <div class="h-auto bg-white">
            <select
              class="text-center"
              id="category"
              type="select"
              name="category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option>Other</option>
              <option>Food</option>
              <option>Music</option>
              <option>Animals</option>
              <option>Computers</option>
            </select>
          </div>
        </div>
        <p class="h-[5px]" />
        <div class="rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px]">
          <div class="h-auto w-auto bg-white">
            <input
              class="text-center"
              id="forumpost"
              type="text"
              name="title"
              placeholder="SUBJECT OF DISCUSSION"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
        </div>
        <p class="h-[5px]" />
        <div class="h-auto w-auto rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px]">
          <div class="h-auto w-auto bg-white">
            <textarea
              class="text-center "
              id="forumpost"
              type="textarea"
              name="text"
              placeholder="What's on your mind? :) "
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          </div>
        </div>

        <button
          class="font-bold sticky text-[18px] hover:text-[19px]
          text-transparent bg-clip-text 
          bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
          hover:to-pink-500 hover:via-red-500 hover:from-yellow-500"
          type="submit"
        >
          ⟫ DISCUSS ⟪
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default CreateForumpost;
