import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Employee from "./employee/Employee";
// import Sidebar from "./Sidebar";
// import AdminNavbar from "./AdminNavbar";
import AddEmployeeModal from "./employee/modal";
import Vehicles from "./Vehicles";
import AdminLayout from "./AdminLayout";
import AdminDashboard from "./DashBoard";


function App() {
  return (
    <BrowserRouter>
    {/* <Sidebar /> */}
      <Routes>
        <Route path="/" element={<Login />} />
      <Route path="/admin" element={<AdminLayout/>}>
        <Route index element={<AdminDashboard/>}/>
        <Route path="employee" element={<Employee />} />
        {/* <Route path="AdminNavbar" element={<AdminNavbar/>}/> */}
        {/* <Route path="/sidebar" element={<Sidebar />} /> */}
        <Route path="modal" element={<AddEmployeeModal />} />
        <Route path="vehicles" element={<Vehicles/>}/>
      </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
