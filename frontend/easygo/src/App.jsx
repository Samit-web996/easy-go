import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Employee from "./employee/Employee";
import AddEmployeeModal from "./employee/modal";
import Vehicles from "./Vehicles";
import AdminDashboard from "./DashBoard";
import AdminLayout from "./AdminLayout";
import Financial from "./Financial";
import { ToastContainer } from "react-toastify";
// import "./App.css";

function App() {
  return (
    <BrowserRouter>
    <ToastContainer />

      <Routes>
        
        <Route path="/" element={<Login />} />

        
        <Route path="/admin" element={<AdminLayout />}>

          <Route index element={<AdminDashboard />} />
          <Route path="employee" element={<Employee />} />
          <Route path="modal" element={<AddEmployeeModal />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="financial" element={<Financial/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;