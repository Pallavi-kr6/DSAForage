import { useEffect, useState } from "react";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    const res = await fetch("http://localhost:5000/api/questions");
    const data = await res.json();
    setQuestions(data);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Questions</h2>

      {questions.map((q) => (
        <div key={q.id} style={{ marginBottom: "15px", border: "1px solid #ccc", padding: "10px" }}>
          <h3>{q.title}</h3>
          <a href={q.link} target="_blank" rel="noopener noreferrer">View Question</a>
          <p>Difficulty: {q.difficulty}</p>
        </div>
      ))}
    </div>
  );
}

export default QuestionList;
