import { useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaClipboardList } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import defaultAvatar from '../assets/img/default-avatar.webp';
import avatar1 from '../assets/img/Register/icon1.png';
import avatar2 from '../assets/img/Register/icon2.png';
import avatar3 from '../assets/img/Register/icon3.png';
import avatar4 from '../assets/img/Register/icon4.png';
import '../assets/css/SidebarPerfil.css';

// Mapeo de nombres a imágenes
const avatarMap = {
  avatar1,
  avatar2,
  avatar3,
  avatar4
};

function SidebarPerfil() {
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <div className="profile-section">
        <div className="profile-pic">
          <img
            src={avatarMap[usuario?.usuario?.avatar] || defaultAvatar}
            alt="Avatar"
            className="avatar-img"
          />
        </div>
        <h3>{usuario?.usuario?.nombre || "USUARIO"}</h3>
      </div>

      <nav className="menu">
        <button 
          className={`menu-item ${isActive('/perfil') ? 'active' : ''}`}
          onClick={() => navigate('/perfil')}
        >
          <FaUser />
          <span>Publicaciones</span>
        </button>
        <button 
          className={`menu-item ${isActive('/carrito') ? 'active' : ''}`}
          onClick={() => navigate('/carrito')}
        >
          <FaShoppingCart />
          <span>Mi Carrito</span>
        </button>
        <button 
          className={`menu-item ${isActive('/pedidos') ? 'active' : ''}`}
          onClick={() => navigate('/pedidos')}
        >
          <FaClipboardList />
          <span>Mis Pedidos</span>
        </button>
        <button 
          className={`menu-item ${isActive('/compras') ? 'active' : ''}`}
          onClick={() => navigate('/compras')}
        >
          <FaClipboardList />
          <span>Mis Compras</span>
        </button>
      </nav>
    </div>
  );
}

export default SidebarPerfil;
