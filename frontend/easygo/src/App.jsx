import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import DashBoard from "./DashBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
