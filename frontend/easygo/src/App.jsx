// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./Login/Login";
// import Employee from "./employee/Employee";
// import Sidebar from "./Sidebar";
// import AdminNavbar from "./AdminNavbar";
// import AddEmployeeModal from "./employee/modal";
// import Vehicles from "./Vehicles";
// // import AdminLayout from "./AdminLayout";
// import AdminDashboard from "./DashBoard";


// function App() {
//   return (
//     <BrowserRouter>
//     {/* <Sidebar /> */}
//       <Routes>
//         <Route path="/" element={<Login />} />
//       {/* <Route path="/admin" element={<AdminLayout/>}> */}
//         <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
//         <Route path="/employee" element={<Employee />} />
//         <Route path="/AdminNavbar" element={<AdminNavbar/>}/>
//         <Route path="/sidebar" element={<Sidebar />} />
//         <Route path="/modal" element={<AddEmployeeModal />} />
//         <Route path="/vehicles" element={<Vehicles/>}/>
//       {/* </Route> */}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Employee from "./employee/Employee";
import AddEmployeeModal from "./employee/modal";
import Vehicles from "./Vehicles";
import AdminDashboard from "./DashBoard";
import AdminLayout from "./AdminLayout";
import Financial from "./Financial";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard Layout */}
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