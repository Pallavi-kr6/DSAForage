import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome</h1>
      
      <Link to="/add-question">
        <button>Add Question</button>
      </Link>

      <Link to="/questions">
        <button>View Questions</button>
      </Link>
    </div>
  );
}

export default Home;
