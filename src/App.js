import Welcome from "./views/Welcome";
import Login from "./views/Login";
import Home from "./views/Home";
import Listrik from "./views/Listrik";
import Pajak from "./views/Pajak";
import EditPajak from "./views/EditPajak";
import Wifi from "./views/Wifi";

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

        {/* WARGA PAGES */}
        <Route path="/warga" element={<Warga />} />
        <Route path="/editwarga/:id" element={<EditWarga />} />

        <Route path="/listrik" element={<Listrik />} />

        {/* PAJAK PAGES */}
        <Route path="/pajak" element={<Pajak />} />
        <Route path="/edit-pajak/:id_pajak" element={<EditPajak />} />

        {/* WIFI PAGES */}
        <Route path="wifi" element={<Wifi />} />
      </Routes>
    </div>
  );
}

export default App;
