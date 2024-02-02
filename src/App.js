import Welcome from "./views/Welcome";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Welcome />} />
      </Routes>
    </div>
  );
}

export default App;
