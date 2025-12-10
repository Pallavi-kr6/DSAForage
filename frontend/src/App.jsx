import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./pages/login.jsx";
import Home from "./pages/home.jsx";
import AddQuestion from "./pages/AddQuestion.jsx";
import QuestionList from "./pages/QuestionList.jsx";

function App() {
 

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/add-question" element={<AddQuestion />} />
<Route path="/questions" element={<QuestionList />} />

     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
