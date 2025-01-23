import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AdminRoute from './Routes/Admin.Routes'
import UserRoute from './Routes/User.Routes'
import Login from './components/auth/Login';
import SuperAdminRoute from './Routes/SuperAdmin.Routes'
import Register from './components/auth/Register'
import SubAdminRoutes from './Routes/SubAdminRoutes'


const App = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const Role = localStorage.getItem('Role')

  

  useEffect(() => {
    if (location.pathname.startsWith("/updatepassword")) {
      navigate(location.pathname);
      return;
    }
    if (location.pathname === "/register") {
      navigate("/register");
      return;
    }

    // Check if user details exist
    if (!Role || Role === "null" || location.pathname === "/login") {
   
      
      navigate("/login");
      return;
    }


    // Redirect based on user role and route prefix
    switch (Role) {
      case "Admin":
        if (location.pathname === "/login" || location.pathname === "/" || !location.pathname.startsWith("/admin")) {
          navigate("/admin/dashboard");
        }
        break;
      case "User":
        if (location.pathname === "/login" || location.pathname === "/" || !location.pathname.startsWith("/user")) {
          navigate("/user/dashboard");
        }
        break;
        case "Subadmin":
         
          
        if (location.pathname === "/login" || location.pathname === "/" || !location.pathname.startsWith("/subadmin")) {
          navigate("/subadmin/dashboard");
         
          
        }
        break;
      default:
        break;
    }
  }, [navigate, location.pathname, Role]);




  return (
    <>
 
      <Routes>
        <Route path="/admin/*" element={(Role === "Admin") ? <AdminRoute /> : <Login />} />
        <Route path="/user/*" element={(Role === "User") ? <UserRoute /> : <Login />} />
        <Route path="/superadmin/*" element={(Role === "Superadmin") ? <SuperAdminRoute /> : <Login />} />
        <Route path="/subadmin/*" element={(Role === "Subadmin") ? <SubAdminRoutes /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes> 

    </>
  );
}

export default App;
