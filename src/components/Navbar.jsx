import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { AuthContext } from "../context/AuthContext";
import { FaUser, FaShoppingCart, FaStar, FaBars, FaTimes } from 'react-icons/fa';
import '../assets/css/Navbar.css';

// Importar imágenes de avatares
import avatar1 from '../assets/img/Register/icon1.png';
import avatar2 from '../assets/img/Register/icon2.png';
import avatar3 from '../assets/img/Register/icon3.png';
import avatar4 from '../assets/img/Register/icon4.png';
import defaultAvatar from '../assets/img/default-avatar.webp';

// Mapeo de nombres a imágenes
const avatarMap = {
  avatar1,
  avatar2,
  avatar3,
  avatar4
};

function Navbar() {
  const { carrito, calcularTotal } = useContext(CarritoContext);
  const { usuario, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo-section">
        <div className="container-0-1-6">
          <div className="logo-icon">
            <FaStar color="#151c33" />
          </div>
        </div>
        <Link to="/" className="text-0-1-4">TREND'S</Link>
      </div>

      {/* Botón de hamburguesa para móviles */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        {menuOpen ? <FaTimes color="#ffffff" size={24} /> : <FaBars color="#ffffff" size={24} />}
      </div>

      <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
        {!usuario ? (
          <>
            <div className="menu-items-desktop">
              <span className="text-0-1-5">
                <Link to="/registro">REGISTRO</Link>
              </span>
              <span className="text-0-1-1">
                <Link to="/login">INGRESAR</Link>
              </span>
            </div>
            <div className="menu-items-mobile">
              <span className="text-0-1-5">
                <Link to="/registro" onClick={closeMenu}>REGISTRO</Link>
              </span>
              <span className="text-0-1-1">
                <Link to="/login" onClick={closeMenu}>INGRESAR</Link>
              </span>
            </div>
          </>
        ) : (
          <>
            {/* Menú de escritorio - fila horizontal */}
            <div className="menu-items-desktop">
              <Link to="/perfil">Mi Perfil</Link>
              <Link to="/publicar">Publicar</Link>
              <button onClick={logout}>Cerrar sesión</button>
            </div>
            
            {/* Menú móvil - columna vertical */}
            <div className="menu-items-mobile">
              <Link to="/perfil" onClick={closeMenu}>Mi Perfil</Link>
              <Link to="/publicar" onClick={closeMenu}>Publicar</Link>
              <button onClick={() => { logout(); closeMenu(); }}>Cerrar sesión</button>
            </div>
          </>
        )}
      </div>

      {/* Avatar visible en la barra de navegación */}
      {usuario && (
        <div className="avatar-container">
          <img
            src={avatarMap[usuario.usuario.avatar] || defaultAvatar}
            alt="Avatar"
            className="avatar-img"
          />
        </div>
      )}

      {/* Carrito flotante */}
      {usuario && (
        <div className="floating-cart">
          <Link to="/carrito" className="container-0-1-3">
            <FaShoppingCart color="#151c33" size={20} />
            {carrito && carrito.length > 0 && (
              <span className="cart-total">
                ${calcularTotal().toLocaleString("es-CL")}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;