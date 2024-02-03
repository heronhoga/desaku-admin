import Welcome from "./views/Welcome";
import Login from "./views/Login";
import Home from "./views/Home";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
