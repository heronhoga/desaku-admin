import Welcome from "./views/Welcome";
import Login from "./views/Login";
import Home from "./views/Home";
import { Route, Routes } from "react-router-dom";
import Warga from "./views/Warga";
import EditWarga from "./views/EditWarga";
function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/warga" element={<Warga />} />
        <Route path="/warga" element={<Warga />} />
        <Route path="/editwarga" element={<EditWarga />} />
      </Routes>
    </div>
  );
}

export default App;
