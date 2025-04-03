"use client"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Layout from "./components/Layout"
import Dashboard from "./components/Dashboard"
import GraficasHistoricas from "./components/GraficasHistoricas"
import ParcelasEliminadas from "./components/ParcelasEliminadas"
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"
import ForgotPassword from "./components/auth/ForgotPassword"
import ResetPassword from "./components/auth/ResetPassword"
import LandingPage from "./components/LandingPage"
import PrivateRoute from "./components/auth/privateRoute"
import NotFound from "./components/NotFound"
import "./styles/App.css"

function App() {
  // Estado para verificar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Verificar si hay un token en localStorage al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  // Mostrar un estado de carga mientras se verifica la autenticación
  if (isLoading) {
    return <div className="loading-screen">Cargando...</div>
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page como ruta principal */}
        <Route index element={<LandingPage />} />

        {/* Rutas protegidas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/graficas"
          element={
            <PrivateRoute>
              <Layout>
                <GraficasHistoricas />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/eliminadas"
          element={
            <PrivateRoute>
              <Layout>
                <ParcelasEliminadas />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Rutas públicas con redirección si ya está autenticado */}
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/forgot-Password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Ruta para NotFound */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

