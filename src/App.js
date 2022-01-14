// import Routes from '../routes.js'
import Satoko from "./pages/Satoko";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/satoko" element={<Satoko />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
