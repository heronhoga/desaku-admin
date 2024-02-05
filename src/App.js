import Welcome from "./views/Welcome";
import Login from "./views/Login";
import Home from "./views/Home";
import Listrik from "./views/Listrik";
import Pajak from "./views/Pajak";
import EditPajak from "./views/EditPajak";
import Wifi from "./views/Wifi";
import TagihanWifi from "./views/TagihanWifi";
import Iuran from "./views/Iuran";
import Pasar from "./views/Pasar";
import EditPasar from "./views/EditPasar";

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
        <Route path="/wifi" element={<Wifi />} />
        <Route path="/tagihanwifi" element={<TagihanWifi />} />

        {/* IURAN PAGES */}
        <Route path="/iuran" element={<Iuran />} />

        {/* E-PASAR PAGES */}
        <Route path="/epasar" element={<Pasar />} />
        <Route path="/epasar/edit/:id_toko" element={<EditPasar />} />
      </Routes>
    </div>
  );
}

export default App;
