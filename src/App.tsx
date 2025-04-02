import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import GraficasHistoricas from "./components/GraficasHistoricas";
import ParcelasEliminadas from "./components/ParcelasEliminadas"; // <-- Importa
import Register from "./components/auth/register"; // <-- Importa Register
import Login from "./components/auth/login"; // <-- Importa Register
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword"; // <-- Importa ResetPassword



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/graficas" element={<Layout><GraficasHistoricas /></Layout>} />
        <Route path="/eliminadas" element={<Layout><ParcelasEliminadas /></Layout>} /> {/* <-- Nueva ruta */}
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-Password" element={<ForgotPassword/>} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route index element={<Login />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
