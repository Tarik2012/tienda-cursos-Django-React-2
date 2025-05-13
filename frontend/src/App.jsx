import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import CourseList from "./components/CourseList";
import CourseDetail from "./components/CourseDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserPanel from "./components/UserPanel"; // 🔐 Componente protegido
import ProtectedRoute from "./routes/ProtectedRoute"; // 🔐 Ruta protegida
import { AuthProvider } from "./context/AuthContext"; // 🌐 Estado global
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer";
import SearchResults from "./components/SearchResults";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <CartProvider>
      {" "}
      {/* 🛒 Contexto global del carrito */}
      <AuthProvider>
        {" "}
        {/* 🌐 Estado global de autenticación */}
        <Router>
          <Header />
          <div className="pt-24 px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<CourseList />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:uid/:token"
                element={<ResetPassword />}
              />

              {/* 🔐 Ruta protegida para el Panel del Usuario */}
              <Route
                path="/user-panel"
                element={
                  <ProtectedRoute>
                    <UserPanel />
                  </ProtectedRoute>
                }
              />

              {/* 🛒 Ruta del carrito */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
