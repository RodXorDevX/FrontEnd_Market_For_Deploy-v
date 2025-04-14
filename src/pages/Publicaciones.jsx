import { useNavigate } from 'react-router-dom';
import GaleriaPublicaciones from "../components/GaleriaPublicaciones";
import { FaHome } from 'react-icons/fa';
import "../assets/css/Publicaciones.css";

function Publicaciones() {
  const navigate = useNavigate();
  
  return (
    <div className="publicaciones-container">
      <div className="header-publicaciones">
        <button 
          className="home-button"
          onClick={() => navigate('/')}
        >
          <FaHome size={20} />
          <span>Trends</span>
        </button>
      </div>
      <GaleriaPublicaciones search="" />
    </div>
  );
}

export default Publicaciones;
