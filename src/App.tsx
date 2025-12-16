import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Unauthorized from "./pages/Unauthorized.tsx";
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home.tsx";
import Register from "./pages/Register.tsx";


export default function App() {
return (
<BrowserRouter>
  <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<Register />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route
      path="/admin"
      element={
      <ProtectedRoute role={['admin']}>
      <AdminDashboard />
      </ProtectedRoute>
      }
      />

      <Route
      path="/provider"
      element={
      <ProtectedRoute role={['admin', 'provider']}>
      <ProviderDashboard />
      </ProtectedRoute>
      }
      />

      <Route
      path="/customer"
      element={
      <ProtectedRoute role={['admin', 'customer']}>
      <CustomerDashboard />
      </ProtectedRoute>
      }
      />
  </Routes>
</BrowserRouter>
);
}