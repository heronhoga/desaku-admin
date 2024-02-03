import Welcome from "./views/Welcome";
import Login from "./views/Login";
import Home from "./views/Home";
import Listrik from "./views/Listrik";
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
        <Route path="/editwarga/:id" element={<EditWarga />} />
        <Route path="/listrik" element={<Listrik />} />
      </Routes>
    </div>
  );
}

export default App;
