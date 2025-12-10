import { useState } from "react";

function AddQuestion() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, link, difficulty }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Question added successfully");
      setTitle("");
      setLink("");
      setDifficulty("Easy");
    } else {
      alert("Error: " + data.error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Add New Question</h2>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <br /><br />

        <label>Link:</label>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />

        <br /><br />

        <label>Difficulty:</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <br /><br />

        <button type="submit">Add Question</button>
      </form>
    </div>
  );
}

export default AddQuestion;
