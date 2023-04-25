import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserTable from "./components/UserTable";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usertable" element={<UserTable />} />
          <Route path="/edit/:id" element={<Home/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
