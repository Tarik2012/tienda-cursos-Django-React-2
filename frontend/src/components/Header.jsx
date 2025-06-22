import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import SearchOverlay from "./SearchOverlay";
import logo from "/logo1.png";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [highlightCart, setHighlightCart] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // 💡 Efecto visual cuando se actualiza el carrito
  useEffect(() => {
    if (cartItems.length > 0) {
      setHighlightCart(true);
      const timeout = setTimeout(() => setHighlightCart(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [cartItems]);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="TariTech Logo"
            className="h-16 w-auto max-w-none object-contain"
          />
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-gray-700 focus:outline-none"
        >
          ☰
        </button>

        <div className="hidden md:flex justify-between items-center w-full ml-8">
          {/* 🔗 Navegación */}
          <nav className="flex space-x-6">
            <Link to="/courses" className="text-gray-700 hover:text-blue-600">
              Cursos
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">
              Sobre TariTech
            </Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
              Visualización de Datos
            </Link>
            <Link
              to="/user-panel"
              className="text-gray-700 hover:text-blue-600"
            >
              Panel
            </Link>
          </nav>

          {/* 👉 Zona de usuario + buscador + carrito */}
          <div className="flex items-center space-x-4 ml-auto">
            {/* 🔍 Lupa que abre overlay */}
            <button
              onClick={() => setShowSearchOverlay(true)}
              className="text-gray-700 hover:text-blue-600 text-xl"
            >
              🔍
            </button>

            {!isAuthenticated ? (
              <>
                <Link
                  to="/register"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Registro
                </Link>
                <Link to="/login" className="text-gray-700 hover:text-blue-600">
                  Login
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600"
              >
                Logout
              </button>
            )}

            {/* 🛒 Carrito con efecto visual */}
            <Link
              to="/cart"
              className={`relative ${
                highlightCart ? "text-green-600 font-semibold" : "text-gray-700"
              } hover:text-blue-600 transition-colors duration-300`}
            >
              🛒 Carrito {cartCount > 0 && `(${cartCount})`}
            </Link>
          </div>
        </div>
      </div>

      {/* 📱 Menú móvil */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 py-4 space-y-2 shadow-md">
          <Link
            to="/courses"
            className="block text-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            Cursos
          </Link>
          <Link
            to="/about"
            className="block text-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            Sobre TariTech
          </Link>
          <Link
            to="/dashboard"
            className="block text-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            Visualización de Datos
          </Link>

          {/* ✅ Añade esto */}
          {isAuthenticated && (
            <Link
              to="/user-panel"
              className="block text-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              Panel
            </Link>
          )}

          <Link
            to="/cart"
            className={`block ${
              highlightCart ? "text-green-600 font-semibold" : "text-gray-700"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            🛒 Carrito {cartCount > 0 && `(${cartCount})`}
          </Link>

          <hr />
          {!isAuthenticated ? (
            <>
              <Link
                to="/register"
                className="block text-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                Registro
              </Link>
              <Link
                to="/login"
                className="block text-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="block text-left w-full text-gray-700 hover:text-red-600"
            >
              Logout
            </button>
          )}
        </div>
      )}

      {/* 🔍 Overlay de búsqueda */}
      {showSearchOverlay && (
        <SearchOverlay onClose={() => setShowSearchOverlay(false)} />
      )}
    </header>
  );
}

export default Header;
