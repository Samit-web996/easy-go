import {Navigate, Outlet } from "react-router-dom";
import useAuthStores from "./store/authStore";


function ProtectedRoute() {
      const token = useAuthStores((state) => state.token);

      return token ? <Outlet /> : <Navigate to="/" />

};

export default ProtectedRoute;