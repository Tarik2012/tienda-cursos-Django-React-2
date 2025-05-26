import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import CourseList from "./components/CourseList";
import CourseDetail from "./components/CourseDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserPanel from "./components/UserPanel";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer";
import SearchResults from "./components/SearchResults";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <Header />
          <div
            style={{
              transform: "scale(0.8)",
              transformOrigin: "top center",
            }}
            className="pt-24 px-4"
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<CourseList />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/reset-password/:uid/:token"
                element={<ResetPassword />}
              />
              <Route
                path="/user-panel"
                element={
                  <ProtectedRoute>
                    <UserPanel />
                  </ProtectedRoute>
                }
              />
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
