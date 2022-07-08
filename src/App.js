import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Homepage from "./components/Homepage";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/" element={<Login/>} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;