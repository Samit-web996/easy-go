import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Employee from "./employee/Employee";
import AddEmployeeModal from "./employee/modal";
import Vehicles from "./vehicles/Vehicles";
import AdminDashboard from "./Dashboard/DashBoard";
import AdminLayout from "./AdminLayout";
import Financial from "./Financial";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./ProtectedRoute";
import { StyledEngineProvider } from "@mui/material";
// import "./App.css";

function App() {
  return (
    <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <ToastContainer />

      <Routes>
      
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="employee" element={<Employee />} />
            <Route path="modal" element={<AddEmployeeModal />} />
            <Route path="vehicles" element={<Vehicles />} />
            {/* <Route path=""/> */}
            <Route path="financial" element={<Financial />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </StyledEngineProvider>
  );
}

export default App;